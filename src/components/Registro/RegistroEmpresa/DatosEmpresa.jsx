import { MenuItem, Grid, TextField, Typography, Accordion, AccordionDetails, AccordionSummary, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getRubros } from "../../../services/rubros_service";
import { getCadenaValor } from "../../../services/cadenaValor_service";
import { getProvincias } from "../../../services/provincias_service";
import { getCiudades } from "../../../services/ciudades_service";

export default function DatosPersonales({
  empresa,
  setEmpresa,
  schema,
  validarErrores,
  setValidarErrores,
}) {
  DatosPersonales.propTypes = {
    empresa: PropTypes.object.isRequired,
    setEmpresa: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    validarErrores: PropTypes.object.isRequired,
    setValidarErrores: PropTypes.func.isRequired,
  };
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [rubros, setRubros] = useState([]);
  const [cadenaValor, setCadenaValor] = useState([]);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  useEffect(() => {
    const traerProvincias = async () => {
      const response = await getProvincias();
      if (response) {
        setProvincias(response.provincias);
      }
    };
    traerProvincias();
  }, []);

  useEffect(() => {
    const traerRubros = async () => {
      const response = await getRubros();
      if (response) {
        setRubros(response.rubros);
      }
    };
    traerRubros();
  }, []);

  useEffect(() => {
    const traerCiudades = async () => {
      const response = await getCiudades(empresa.provincia);
      if (response && response.ciudades) {
        setCiudades(response.ciudades);
      }
    };

    if (empresa.provincia) {
      traerCiudades();
    }
  }, [empresa.provincia]);

  

  useEffect(() => {
    const traerCadenaValor = async () => {
      const response = await getCadenaValor();
      if (response) {
        setCadenaValor(response.cadenaValor);
      }
    };
    traerCadenaValor();
  }, []);

  const handleChange = (e) => {
    setEmpresa({
      ...empresa,
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
      <Typography variant="h6" gutterBottom>
        Datos personales
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Nombre de la empresa"
            id="nombreEmpresa"
            name="nombreEmpresa"
            variant="outlined"
            fullWidth
            value={empresa.nombreEmpresa || ""}
            InputLabelProps={{
              shrink: empresa.nombreEmpresa ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.nombreEmpresa)}
            helperText={
              validarErrores.nombreEmpresa ? validarErrores.nombreEmpresa : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="CUIT"
            id="cuit"
            name="cuit"
            variant="outlined"
            fullWidth
            value={empresa.cuit || ""}
            InputLabelProps={{
              shrink: empresa.cuit ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.cuit)}
            helperText={validarErrores.cuit ? validarErrores.cuit : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Descripción"
            id="descripcion"
            name="descripcion"
            variant="outlined"
            fullWidth
            multiline
            value={empresa.descripcion || ""}
            InputLabelProps={{
              shrink: empresa.descripcion ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.descripcion)}
            helperText={
              validarErrores.descripcion ? validarErrores.descripcion : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Nacionalidad"
            id="pais"
            name="pais"
            variant="outlined"
            fullWidth
            value={empresa.pais || ""}
            InputLabelProps={{
              shrink: empresa.pais ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.pais)}
            helperText={validarErrores.pais ? validarErrores.pais : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            required
            label="Rubro"
            id="idRubro"
            name="idRubro"
            variant="outlined"
            fullWidth
            value={empresa.idRubro || ""}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.idRubro)}
            helperText={validarErrores.idRubro ? validarErrores.idRubro : ""}
          >
            {rubros.map((rubro) => (
              <MenuItem key={rubro.id} value={rubro.id}>
                {rubro.nombre_rubro}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            required
            label="Cadena de valor"
            id="idCadenaValor"
            name="idCadenaValor"
            variant="outlined"
            fullWidth
            value={empresa.idCadenaValor || ""}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.idCadenaValor)}
            helperText={
              validarErrores.idCadenaValor ? validarErrores.idCadenaValor : ""
            }
          >
            {cadenaValor.map((cadena) => (
              <MenuItem key={cadena.id} value={cadena.id}>
                {cadena.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            required
            label="Provincia"
            id="provincia"
            name="provincia"
            variant="outlined"
            fullWidth
            value={
              provincias.find((provincia) => provincia.id === empresa.provincia)
                ?.id || ""
            }
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.provincia)}
            helperText={
              validarErrores.provincia ? validarErrores.provincia : ""
            }
          >
            {provincias.map((provincia) => (
              <MenuItem key={provincia.id} value={provincia.id}>
                {provincia.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            required
            label="Ciudad"
            id="ciudad"
            name="ciudad"
            variant="outlined"
            fullWidth
            value={
              ciudades.find((ciudad) => ciudad.id === empresa.ciudad)?.id || ""
            }
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.ciudad)}
            helperText={validarErrores.ciudad ? validarErrores.ciudad : ""}
          >
            <MenuItem value="">Selecciona una ciudad</MenuItem>
            {ciudades.map((ciudad) => (
              <MenuItem key={ciudad.id} value={ciudad.id}>
                {ciudad.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Nombre de la calle"
            id="calle"
            name="calle"
            variant="outlined"
            fullWidth
            value={empresa.calle || ""}
            InputLabelProps={{
              shrink: empresa.calle ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.calle)}
            helperText={validarErrores.calle ? validarErrores.calle : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Altura de la calle"
            id="nro"
            name="nro"
            variant="outlined"
            fullWidth
            value={empresa.nro || ""}
            InputLabelProps={{
              shrink: empresa.nro ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.nro)}
            helperText={validarErrores.nro ? validarErrores.nro : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Piso"
            id="piso"
            name="piso"
            variant="outlined"
            fullWidth
            value={empresa.piso || ""}
            InputLabelProps={{
              shrink: empresa.piso ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.piso)}
            helperText={validarErrores.piso ? validarErrores.piso : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Departamento"
            id="depto"
            name="depto"
            variant="outlined"
            fullWidth
            value={empresa.depto || ""}
            InputLabelProps={{
              shrink: empresa.depto ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.depto)}
            helperText={validarErrores.depto ? validarErrores.depto : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Código postal"
            id="cp"
            name="cp"
            variant="outlined"
            fullWidth
            value={empresa.cp || ""}
            InputLabelProps={{
              shrink: empresa.cp ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.cp)}
            helperText={validarErrores.cp ? validarErrores.cp : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Teléfono"
            id="telefono"
            name="telefono"
            variant="outlined"
            fullWidth
            value={empresa.telefono || ""}
            InputLabelProps={{
              shrink: empresa.telefono ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.telefono)}
            helperText={validarErrores.telefono ? validarErrores.telefono : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Página web"
            id="web"
            name="web"
            variant="outlined"
            fullWidth
            value={empresa.web || ""}
            InputLabelProps={{
              shrink: empresa.web ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.web)}
            helperText={validarErrores.web ? validarErrores.web : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Rol del representante"
            id="rol_representante"
            name="rol_representante"
            variant="outlined"
            fullWidth
            value={empresa.rol_representante || ""}
            InputLabelProps={{
              shrink: empresa.rol_representante ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.rol_representante)}
            helperText={
              validarErrores.rol_representante
                ? validarErrores.rol_representante
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Nombre del representante"
            id="nombreRepresentante"
            name="nombreRepresentante"
            variant="outlined"
            fullWidth
            value={empresa.nombreRepresentante || ""}
            InputLabelProps={{
              shrink: empresa.nombreRepresentante ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.nombreRepresentante)}
            helperText={
              validarErrores.nombreRepresentante
                ? validarErrores.nombreRepresentante
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Email del representante"
            id="emailRepresentante"
            name="emailRepresentante"
            variant="outlined"
            fullWidth
            value={empresa.emailRepresentante || ""}
            InputLabelProps={{
              shrink: empresa.emailRepresentante ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.emailRepresentante)}
            helperText={
              validarErrores.emailRepresentante
                ? validarErrores.emailRepresentante
                : ""
            }
          />
        </Grid>
        <Grid container spacing={3} sx={{ marginY: "4px" }}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Términos y condiciones</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                <h1>CONDICIONES GENERALES DE USO DEL SERVICIO</h1>

<h2>1. CONDICIONES GENERALES Y SU ACEPTACIÓN</h2>
<p>Las presentes condiciones generales (en adelante, las "Condiciones Generales") regulan el servicio de publicación conforme a las demandas de empleo (en adelante, el "Servicio"), que la Dirección de Vinculación Tecnológica (DVT) de la Universidad Nacional de Hurlingham (UNAHUR), pone gratuitamente a disposición de los usuarios a través del sitio web institucional <a href="https://bolsadetrabajo.unahur.edu.ar">bolsadetrabajo.unahur.edu.ar</a>.</p>
<p>El cumplimiento y envío del formulario de registro indicado en la Cláusula 4.2 (en adelante, el "Formulario de Registro") atribuye la condición de usuario del Servicio (en adelante, "Postulante" / “Empresa”), y expresa la aceptación de las Condiciones Generales en la versión publicada por DVT.</p>

<h2>2. OBJETO</h2>
<p>Las Condiciones Generales regulan la prestación y utilización del Servicio por parte de DVT para los postulantes/empresas.</p>
<p>La DVT se reserva el derecho a modificar unilateralmente, en cualquier momento y sin aviso previo, la presentación y configuración de la plataforma de empleo.</p>

<h2>3. EL SERVICIO</h2>
<p>A través del Servicio, los postulantes y las empresas ponen a disposición de DVT ciertos datos de carácter personal para que el área de Empleabilidad, los integre en una base de datos y los ponga a disposición de la Universidad y de terceros, para difundir a través de la plataforma de empleo o cualquier otro medio similar.</p>

<h2>4. CONDICIONES DE ACCESO Y UTILIZACIÓN DEL SERVICIO</h2>
<h3>4.1. Carácter gratuito del Servicio</h3>
<p>La prestación del servicio por parte del DVT tiene carácter gratuito para los postulantes y las empresas que se hayan registrado en la base de datos.</p>

<h3>4.2. Condiciones de alta en el Servicio</h3>
<p>Para la utilización del Servicio se requiere que el postulante / empresa se encuentre dado de alta como usuario de la bolsa de empleo UNAHUR, cumplimentando todos los campos de carácter obligatorio.</p>

<h3>4.3. Modificación de los datos personales y baja en el Servicio</h3>
<p>Los usuarios podrán modificar, en cualquier momento, los datos personales proporcionados. Podrán darse de baja del Servicio enviando un e-mail a la dirección <a href="mailto:empleabilidad@unahur.edu.ar">empleabilidad@unahur.edu.ar</a>. El borrado físico de los datos no se realizará a fin de conservar la integridad de la base de datos.</p>

<h3>4.4. Veracidad, exactitud, vigencia y autenticidad de los datos personales</h3>
<p>Los usuarios garantizan la veracidad, exactitud, vigencia y autenticidad de los datos personales facilitados, y se comprometen a mantenerlos debidamente actualizados y, en particular, a darse de baja en el Servicio con carácter inmediato al momento en el que ya no están interesados.</p>

<h3>4.5. Uso del Servicio</h3>
<p>Cada usuario se compromete a utilizar el Servicio de conformidad con las normas vigentes en la materia, conforme a estas Condiciones Generales.</p>

<h2>5. DATOS DE CARÁCTER PERSONAL</h2>
<p>Para utilizar el Servicio, los usuarios deben proporcionar ciertos datos de carácter personal a través del Formulario de Registro.</p>
<p>Mediante la cumplimentación y envío del correspondiente Formulario de Registro, cada usuario acepta y autoriza que sus Datos Personales sean tratados por la DVT para las finalidades siguientes: (I) la gestión, administración y prestación del Servicio en los términos previstos en estas Condiciones Generales, (II) el estudio de la utilización del Servicio por parte de los postulantes y las empresas, (III) la modificación, ampliación y mejora del Servicio, (IV) el envío de comunicaciones relativas a modificaciones, ampliaciones y mejoras en la configuración del Servicio o al ofrecimiento de nuevos servicios y Newsletter periódicos.</p>
<p>La DVT ha adoptado los niveles de seguridad de protección de los Datos Personales requeridos, y tomará las medidas necesarias a su alcance para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los Datos Personales facilitados al área de Empleabilidad.</p>
<p>No obstante, cada Usuario debe ser consciente de que las medidas de seguridad en Internet no son inexpugnables.</p>

<h2>6. UTILIZACIÓN DEL SERVICIO BAJO LA EXCLUSIVA RESPONSABILIDAD DEL USUARIO</h2>
<p>Cada usuario es consciente y acepta voluntariamente que el uso del Servicio, queda bajo su única y exclusiva responsabilidad.</p>

<h2>7. EXCLUSIÓN DE GARANTÍAS Y DE RESPONSABILIDAD</h2>
<p>La DVT no garantiza la disponibilidad y continuidad del funcionamiento del Servicio. Cuando ello sea razonablemente posible, la DVT advertirá previamente las interrupciones en el funcionamiento del Servicio. La DVT tampoco garantiza la utilidad del Servicio para la realización de ninguna actividad en particular y, en especial, no garantiza que los Datos Personales del postulante sean consultados por un número mínimo de empresas ni que el postulante reciba ofertas de empleo de las empresas.</p>
<p>La DVT se excluye de cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a la falta de disponibilidad o de continuidad del funcionamiento del servicio, a la defraudación por el uso que los demandantes de empleo hubieren podido atribuir al servicio, así como a la utilización que las empresas hagan de los datos personales proporcionados por el postulante.</p>
<p>La DVT no controla ni garantiza el uso que las Empresas puedan hacer de los Datos Personales, ni el contenido o seriedad de las ofertas de empleo, ni la solvencia de las Empresas.</p>
<p>La DVT se excluye de cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse al uso que las empresas puedan hacer de los datos personales, al contenido o seriedad de las ofertas de empleo, así como a la solvencia de las empresas.</p>

<h2>8. DATOS PERSONALES DEL SERVICIO</h2>
<p>La DVT se reserva el derecho a excluir del Servicio, en cualquier momento y sin necesidad de preaviso, los Datos Personales de aquellos usuarios que incumplan estas Condiciones Generales.</p>

<h2>9. DURACIÓN Y TERMINACIÓN</h2>
<p>La prestación del Servicio tiene, en principio, una duración indefinida. La DVT, no obstante, está autorizada para dar por terminada o suspender la prestación del Servicio. Cuando ello sea razonablemente posible, la DVT advertirá previamente la terminación o suspensión de la prestación del Servicio.</p>

<p>Se establece como contacto el correo electrónico <a href="mailto:empleabilidad@unahur.edu.ar">empleabilidad@unahur.edu.ar</a>.</p>

                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
      </Grid>
      </Grid>
    </>
  );
}
