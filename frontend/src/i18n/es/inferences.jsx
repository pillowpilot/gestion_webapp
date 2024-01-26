const t = {
  list: {
    header: "Inferencias",
    newBtn: "Nueva Inferencia",
    datagrid: {
      id: "ID",
      user: "Usuario",
      lot: "Lote",
      date: "Fecha",
      dateFormat: "{{val, datetime}}",
      model: "Modelo",
      taskId: "ID Tarea",
      coordinates: "Coordenadas",
      status: "Estado",
      actions: "Acciones",
    },
  },
  create: {
    inferBtn: "Inferir",
    goBackBtn: "Volver",
    options: {
      leavesDiseases: "Enfermedades de Hojas",
      fruitsDiseases: "Enfermedades de Frutas",
      treeCounting: "Conteo de árboles",
    },
    labels: {
      inferenceModel: "Modelo de inferencia",
      lot: "Lote",
      inputImage: "Imagen de entrada",
    },
    successMsg: "Inferencia creada exitosamente",
    errorMsg: "Error creando inferencia",
  },
  details: {
    goBackBtn: "Volver",
  },
  delete: {
    confirmationMsg: "Eliminar los datos de la inferencia? Esto no se puede deshacer.",
    successMsg: "Inferencia eliminada exitosamente",
    errorMsg: "Error eliminando inferencia",
    goBackBtn: "Volver",
    deleteBtn: "Eliminar",
  }
};

export default t;
