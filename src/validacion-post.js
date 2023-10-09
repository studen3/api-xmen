function validacion(body) {}

app.post("/xm", async (req, res) => {
  // Extraer el titulo del body de la peticion
  const { imagen, nombre, apodo, genero, poder, rol, calificacion } = req.body;
  // Validar que imagen sea un string
  if (typeof imagen !== "string") {
    return res.status(400).json({
      message: "Peticion invalida",
    });
  }
  // Manejar el error con un try catch
  try {
    const result = await pool.query("INSERT INTO xm(imagen) VALUES($1)", [
      imagen,
    ]);
    // Devolver una respuesta exitosa
    res.status(201).json({
      message: "imagen creada exitosamente",
    });
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
  // Validar que nombre sea un string
  if (typeof nombre !== "string") {
    return res.status(400).json({
      message: "Peticion invalida",
    });
  }
  // Manejar el error con un try catch
  try {
    const result = await pool.query("INSERT INTO xm(nombre) VALUES($1)", [
      imagen,
    ]);
    // Devolver una respuesta exitosa
    res.status(201).json({
      message: "nombre creado exitosamente",
    });
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
  // Validar que apodo sea un string
  if (typeof apodo !== "string") {
    return res.status(400).json({
      message: "Peticion invalida",
    });
  }
  // Manejar el error con un try catch
  try {
    const result = await pool.query("INSERT INTO xm(apodo) VALUES($1)", [
      apodo,
    ]);
    // Devolver una respuesta exitosa
    res.status(201).json({
      message: "el apodo se a creado exitosamente",
    });
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
  // Validar que genero sea un string
  if (typeof genero !== "string") {
    return res.status(400).json({
      message: "Peticion invalida",
    });
  }
  // Manejar el error con un try catch
  try {
    const result = await pool.query("INSERT INTO xm(genero) VALUES($1)", [
      genero,
    ]);
    // Devolver una respuesta exitosa
    res.status(201).json({
      message: "imagen creada exitosamente",
    });
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
  // Validar que poder sea un string
  if (typeof poder !== "string") {
    return res.status(400).json({
      message: "Peticion invalida",
    });
  }
  // Manejar el error con un try catch
  try {
    const result = await pool.query("INSERT INTO xm(poder) VALUES($1)", [
      poder,
    ]);
    // Devolver una respuesta exitosa
    res.status(201).json({
      message: "el campo poder a sido creado exitosamente",
    });
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }

  // Validar que rol sea un string
  if (typeof rol !== "string") {
    return res.status(400).json({
      message: "Peticion invalida",
    });
  }
  // Manejar el error con un try catch
  try {
    const result = await pool.query("INSERT INTO xm(rol) VALUES($1)", [rol]);
    // Devolver una respuesta exitosa
    res.status(201).json({
      message: "rol creado exitosamente",
    });
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }

  // Validar que la calificacion sea un number
  if (typeof calificación !== "number") {
    return res.status(400).json({
      message: "Peticion invalida",
    });
  }
  // Manejar el error con un try catch
  try {
    const result = await pool.query("INSERT INTO xm(calificacio) VALUES($1)", [
      calificacion,
    ]);
    // Devolver una respuesta exitosa
    res.status(201).json({
      message: "la calificacion a sido creada exitosamente",
    });
  } catch (error) {
    // Si hubo un error, devolver el error
    res.status(500).json({
      message: error.message,
    });
  }
});
