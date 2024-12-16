import { Typography, TextField, Grid, Checkbox, Box, Select, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from '@mui/material/Button';
import { postNewsletter } from '../../../services/newsletter_service';
import DOMPurify from "dompurify";



export default function Newsletter() {


    const [asunto, setAsunto] = useState('')
    const [titulo, setTitulo] = useState('hol123')
    const [algo, setAlgo] = useState('')
    const [preview, setPreview] = useState(false)
    const [destinatario, setDestinatario] = useState('')

    const destinatarios = ["empresa", "postulante", "ambos"]

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }], // Encabezados
          ['bold', 'italic', 'underline', 'strike'], // Negrita, Cursiva, Subrayado, Tachado
          [{ 'color': [] }, { 'background': [] }], // Color de texto y fondo
          [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Listas ordenadas y desordenadas
          ['link', 'image'], // Enlaces e imágenes
        [{ 'align': ['justify', 'center', 'right', 'left'] }],
          ['clean'], // Botón para limpiar estilos
        ],
      };   
    
      const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'color',
        'background',
        'list',
        'bullet',
        'link',
        'image',
      ];

    const sanitizedHtml = DOMPurify.sanitize(algo)

    const handleChange = (value) => {
        setAlgo(value)
    }

    const selectDestinatary = (e) => {
        setDestinatario(e.target.value)
    }

    
    const showPreview = () => {
        setPreview(!preview)
    }

    const enviarNewsletter = async () => {

        const response = await postNewsletter(titulo, destinatario, asunto, algo)
        console.log(response)
    }
    
  return (
    
    <>
        <Typography variant="h4" gutterBottom>
            Newsletter
        </Typography>
        
        <Grid container spacing={2}>
            <Grid item xs={12}>
                
            </Grid>
           
                <Grid item xs={12}>
                    <TextField
                        select
                        fullWidth
                        label="Destinatario"
                        variant="outlined"
                        value={destinatario}
                        onChange={selectDestinatary}
                    >
                        {
                            destinatarios.map((destinatario, index) => (
                                <MenuItem key={index} value={destinatario}>
                                    {destinatario}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Asunto"
                    variant="outlined"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={algo}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={enviarNewsletter}>
                    Enviar
                </Button>
                <Button variant="contained" color="secondary" onClick={showPreview}>
                    Previsualizar
                </Button>
            </Grid>
            <Grid item xs={12}>
                {
                    preview && (
                        <div dangerouslySetInnerHTML={{__html: sanitizedHtml}} />
                    )
                }
            </Grid>
        </Grid>
    </>
  )
}

