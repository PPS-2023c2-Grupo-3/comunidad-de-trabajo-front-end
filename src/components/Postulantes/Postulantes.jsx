import Header from "../Header/Header";
import { useState, useEffect, forwardRef } from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Slide,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Table,
  TableContainer,
  IconButton,
  Icon,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import { Toaster, toast } from "sonner";

// import PreferenciasOferta from "./PreferenciasOferta";
import {
  getPostulacionesPorIdOferta,
  getPostulacionesPorIdOfertaTodas,
  activarPostulacion,
  desactivarPostulacion,
  marcarContactado,
  marcarNoContactado,
} from "../../services/postulacionesId_service";
import { getOfertaById } from "../../services/ofertas_service";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Postulantes = () => {
  const tipoUsuario = sessionStorage.getItem("tipoUsuario");
  const idOferta = window.location.pathname.split("/")[2];

  const [open, setOpen] = useState(false);
  const [botonOpen, setBotonOpen] = useState("");
  const [postulaciones, setPostulaciones] = useState([]);
  const [idPostulacion, setIdPostulacion] = useState("");
  const [nombreOferta, setNombreOferta] = useState("");

  useEffect(() => {
    const traerPostulaciones = async () => {
      try {
        if (tipoUsuario === "empresa") {
          const response = await getPostulacionesPorIdOferta(0, 20, idOferta);
          setPostulaciones(response.postulaciones.rows);
        } else {
          const response = await getPostulacionesPorIdOfertaTodas(
            0,
            20,
            idOferta
          );
          setPostulaciones(response.postulaciones.rows);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const traerOferta = async () => {
      try {
        const response = await getOfertaById(idOferta);
        setNombreOferta(response.titulo_oferta);
      } catch (error) {
        console.log(error);
      }
    };
    traerOferta();
    traerPostulaciones();
  }, [idOferta, tipoUsuario]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAction = async (id) => {
    if (tipoUsuario === "empresa") {
      try {
        if (botonOpen === "aceptar") {
          const response = await marcarContactado(id);
          if (response) {
            toast.success("Postulante evaluado correctamente");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.error("Error al evaluar postulante");
          }
        } else {
          const response = await marcarNoContactado(id);
          if (response) {
            toast.success("Postulante evaluado correctamente");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.error("Error al evaluar postulante");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (botonOpen === "aceptar") {
          const response = await activarPostulacion(id);
          if (response) {
            toast.success("Postulación aceptada correctamente");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.error("Error al evaluar postulante");
          }
        } else {
          const response = await desactivarPostulacion(id);
          if (response) {
            toast.success("Postulación rechazada correctamente");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.error("Error al evaluar postulante");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            padding: "1rem",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            borderRadius: 2,
          }}
        >
          <CardHeader
            title={"Postulantes a " + nombreOferta}
            sx={{
              "& .MuiTypography-h5": {
                fontSize: "2rem",
                width: {
                  xs: "50%",
                  sm: "100%",
                },
              },
            }}
          />
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant="h5">Nombre</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">DNI</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">Teléfono</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">CV</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">
                      Evaluación de postulante
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">Acciones</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulaciones.map((postulacion) => (
                  <TableRow
                    key={postulacion.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <Typography variant="subtitle1">
                        {postulacion.Postulante?.nombre +
                          " " +
                          postulacion.Postulante?.apellido}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle1">
                        {postulacion.Postulante?.id}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle1">
                        {postulacion.Postulante?.telefono}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        href={postulacion.Postulante?.cv}
                        target="_blank"
                        sx={{
                          color: "green",
                          "&:hover": {
                            backgroundColor: "lightgrey",
                            color: "black",
                          },
                        }}
                      >
                        <PictureAsPdfIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <Icon>
                        {tipoUsuario === "empresa" ? (
                          postulacion.contactado === true ? (
                            <CheckOutlinedIcon
                              sx={{
                                color: "green",
                              }}
                            />
                          ) : postulacion.contactado === false ? (
                            <CloseOutlinedIcon
                              sx={{
                                color: "red",
                              }}
                            />
                          ) : (
                            <PendingActionsIcon
                              sx={{
                                color: "orange",
                              }}
                            />
                          )
                        ) : postulacion.estado_postulacion === true ? (
                          <CheckOutlinedIcon
                            sx={{
                              color: "green",
                            }}
                          />
                        ) : postulacion.estado_postulacion === false ? (
                          <CloseOutlinedIcon
                            sx={{
                              color: "red",
                            }}
                          />
                        ) : (
                          <PendingActionsIcon
                            sx={{
                              color: "orange",
                            }}
                          />
                        )}
                      </Icon>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{
                          color: "white",
                          backgroundColor: "green",
                          "&:hover": {
                            backgroundColor: "green",
                            color: "white",
                          },
                        }}
                        href={`/postulante/${postulacion.Postulante?.id}`}
                      >
                        Ver perfil
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        sx={{
                          margin: 1,
                        }}
                        onClick={() => {
                          setIdPostulacion(postulacion.id);
                          setBotonOpen("aceptar");
                          handleClickOpen();
                        }}
                        disabled={
                          tipoUsuario === "empresa"
                            ? postulacion.contactado === true
                              ? true
                              : false
                            : postulacion.estado_postulacion === true
                            ? true
                            : false
                        }
                      >
                        {tipoUsuario === "empresa"
                          ? "Evaluar"
                          : "Aceptar postulacion"}
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{
                          margin: 1,
                        }}
                        onClick={() => {
                          setIdPostulacion(postulacion.id);
                          setBotonOpen("rechazar");
                          handleClickOpen();
                        }}
                        disabled={
                          tipoUsuario === "empresa"
                            ? postulacion.contactado === false
                              ? true
                              : false
                            : postulacion.estado_postulacion === false
                            ? true
                            : false
                        }
                      >
                        {tipoUsuario === "empresa"
                          ? "Rechazar"
                          : "Rechazar postulacion"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {postulaciones.length === 0 ? (
            <Typography
              variant="h4"
              sx={{ textAlign: "center", padding: "1rem", margin: "1rem" }}
            >
              Aun no hay postulantes para esta oferta
            </Typography>
          ) : null}
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            {botonOpen === "aceptar" ? (
              <DialogTitle>
                {tipoUsuario === "empresa"
                  ? "¿Está seguro que desea evaluar a este postulante?"
                  : "¿Está seguro que desea aceptar esta postulación?"}
              </DialogTitle>
            ) : (
              <DialogTitle>
                {tipoUsuario === "empresa"
                  ? "¿Está seguro que desea rechazar a este postulante?"
                  : "¿Está seguro que desea rechazar esta postulación?"}
              </DialogTitle>
            )}
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                color={botonOpen === "aceptar" ? "success" : "error"}
                onClick={() => {
                  handleClickAction(idPostulacion);
                }}
              >
                {botonOpen === "aceptar"
                  ? tipoUsuario === "empresa"
                    ? "Evaluar postulante"
                    : "Aceptar postulacion"
                  : tipoUsuario === "empresa"
                  ? "Rechazar postulante"
                  : "Rechazar postulacion"}
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Container>

      <Toaster richColors closeButton />
    </>
  );
};

export default Postulantes;
