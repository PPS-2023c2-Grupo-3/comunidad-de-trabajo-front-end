import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getCarreras } from "../../../services/carreras_service";
import { getEstudios } from "../../../services/estudios_service";

export default function DatosAcademicos({
  postulante,
  setPostulante,
  schema,
  validarErrores,
  setValidarErrores,
}) {
  DatosAcademicos.propTypes = {
    postulante: PropTypes.object.isRequired,
    setPostulante: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    validarErrores: PropTypes.object.isRequired,
    setValidarErrores: PropTypes.func.isRequired,
  };

  const [carreras, setCarreras] = useState([]);
  const [estudios, setEstudios] = useState([]);
  const [carreraEnabled, setCarreraEnabled] = useState(false);

  useEffect(() => {
    const getCarrerasData = async () => {
      const response = await getCarreras();
      setCarreras(response.carreras);
    };
    const getEstudiosData = async () => {
      const response = await getEstudios();
      setEstudios(response.estudios);
    };
    getEstudiosData();
    getCarrerasData();
  }, []);

  const handleChange = (e) => {
    // Si se cambia la opción de Estudios, deshabilita Carrera y deselecciónala
    if (e.target.name === "estudios") {
      setCarreraEnabled(e.target.value === 7 || e.target.value === 8);
      setPostulante({
        ...postulante,
        carrera: null, // Desselecciona Carrera
      });
    }

    // Actualiza el resto de los campos
    setPostulante({
      ...postulante,
      [e.target.name]: e.target.value,
    });

    try {
      schema.validateSyncAt(e.target.name, {
        [e.target.name]: e.target.value,
      });
      setValidarErrores({
        ...validarErrores,
        [e.target.name]: false,
      });
    } catch (error) {
      setValidarErrores({
        ...validarErrores,
        [e.target.name]: true,
      });
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ marginY: 2 }}>
        Datos académicos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Estudios"
            id="estudios"
            name="estudios"
            variant="outlined"
            fullWidth
            value={
              estudios.find((estudio) => estudio.id === postulante.estudios)
                ?.id || ""
            }
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.estudios)}
            helperText={validarErrores.estudios ? validarErrores.estudios : ""}
          >
            <MenuItem value="" disabled>
              Seleccione una opción
            </MenuItem>
            {estudios.map((estudio) => (
              <MenuItem key={estudio.id} value={estudio.id}>
                {estudio.nombre_estudio_estado}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Carrera"
            id="carrera"
            name="carrera"
            variant="outlined"
            fullWidth
            value={
              carreras.find((carrera) => carrera.id === postulante.carrera)
                ?.id || ""
            }
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.carrera)}
            helperText={validarErrores.carrera ? validarErrores.carrera : ""}
            disabled={!carreraEnabled}
          >
            <MenuItem value="" disabled>
              Seleccione una opción
            </MenuItem>
            {carreras.map((carrera) => (
              <MenuItem key={carrera.id} value={carrera.id}>
                {carrera.nombre_carrera}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Materias aprobadas"
            id="cantMaterias"
            name="cantMaterias"
            variant="outlined"
            fullWidth
            value={parseInt(postulante.cantMaterias) || ""}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.cantMaterias)}
            helperText={
              validarErrores.cantMaterias ? validarErrores.cantMaterias : ""
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginY: 2 }}>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Alumno de la UNAHUR"
            name="alumnoUnahur"
            checked={postulante.alumnoUnahur}
            onChange={(e) =>
              setPostulante({
                ...postulante,
                [e.target.name]: e.target.checked,
              })
            }
          />
        </Grid>
      </Grid>
    </>
  );
}
