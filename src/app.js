import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

app.use(express.json());

app.use(cors());

// Obtener todos los personajes de la base de datos
app.get("/personajes", async (req, res) => {
  // Hacer un try catch para manejar los errores
  try {
    // Hacer la consulta a la base de datos
    const result = await pool.query("SELECT * FROM xm");
    // Verificar si la consulta no devolvio ningun resultado
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No se encontro el recurso",
      });
    }
    // Si la consulta devolvio un resultado, devolverlo
    res.json(result.rows);
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
});

//Obtener un personaje el por su id
app.get("/personajes/:id", async (req, res) => {
  // Recuperar el id del personaje por params
  const id = req.params.id;
  // Hacer un try catch para manejar los errores
  try {
    // Hacer la consulta a la base de datos
    const result = await pool.query("SELECT * FROM xm WHERE id_personaje = $1", [
      id,
    ]); // Verificar si la consulta no devolvio ningun resultado
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No se encontro el recurso",
      });
    }
    // Si la consulta devolvio un resultado, devolverlo
    res.json(result.rows[0]);
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
});

// Crear un nuevo personaje
app.post("/personajes", async (req, res) => {
  // Extraer el titulo del body de la peticion
  const { imagen, nombre, apodo, genero, poder, rol, calificacion } = req.body;

  // Manejar el error con un try catch
  try {
    const result = await pool.query(
      "INSERT INTO xm(imagen, nombre, apodo, genero, poder, rol, calificacion ) VALUES($1, $2, $3, $4, $5, $6, $7 )",
      [imagen, nombre, apodo, genero, poder, rol, calificacion]
    );
    // Devolver una respuesta exitosa
    res.status(201).json({
      message: "personaje creado exitosamente",
    });
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
});

// Actualizar un personaje
app.put("/personajes/:id", async (req, res) => {
  // Recuperar el id del personaje por params
  const id = req.params.id;
  // Recuperar el estado del personaje por body
  const { imagen, nombre, apodo, genero, poder, rol, calificacion } = req.body;
  // Manejar errores con un try catch
  try {
    const result = await pool.query(
      "UPDATE xm SET imagen = $1, nombre = $2, apodo = $3, genero = $4, poder = $5, rol = $6, calificacion = $7 WHERE id_personaje = $8 RETURNING *",
      [imagen, nombre, apodo, genero, poder, rol, calificacion, id]
    );
    //verificar si se actualizo algun recurso
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "no se encontro ningun personaje con el id proporcionado",
      });
    }
    //devolver una respuesta exitosa con los datos actualizados
    res.json({
      message: "personaje actualizado exitosamente",
      body: result.rows[0],
    });
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
});

// Eliminar un personaje
app.delete("/personajes/:id", async (req, res) => {
  // Recuperar el ID del personaje de los parámetros de la URL
  const id = req.params.id;

  try {
    // Realizar la eliminación en la base de datos
    const result = await pool.query("DELETE FROM xm WHERE id_personaje = $1", [id]);

    // Verificar si se eliminó algún recurso
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "No se encontró ningún personaje con el ID proporcionado.",
      });
    }

    // Devolver una respuesta exitosa sin contenido (204)
    res.sendStatus(204);
  } catch (error) {
    // Si hubo un error, devolver el error
    console.error("Error al eliminar un personaje:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    message: "Recurso no encontrado",
  });
});

const port = process.env.PORT ?? 5000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
