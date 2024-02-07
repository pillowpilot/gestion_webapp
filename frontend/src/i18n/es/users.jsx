const t = {
    list: {
        header: "Usuarios",
        newBtn: "Nuevo usuario",
        datagrid: {
            id: "ID",
            name: "Nombre",
            lastname: "Apellido",
            role: "Rol",
            email: "Email",
            actions: "Acciones",
        },
    },
    create: {
        header: "Crear un nuevo usuario",
        saveBtn: "Guardar",
        goBackBtn: "Volver",
        labels: {
            name: "Nombre",
            lastname: "Apellido",
            email: "Email",
            password: "Contraseña",
            uploadPhoto: "Subir foto",
            allowedFormats: "Formatos permitidos *.jpeg, *.jpg, *.png",
            maxSize: "Tamaño máximo de 3Mb",
        },
        errors: {
            requiredName: "Nombre es requerido",
            requiredLastname: "Apellido es requerido",
            requiredEmail: "Email es requerido",
            requiredPassword: "Contraseña es requerida",
        },
        successMsg: "Usuario creado correctamente",
    },
    details: {
        saveBtn: "Guardar",
        goBackBtn: "Volver",
        updateSuccessMsg: "Usuario actualizado correctamente",
        updateErrorMsg: "Error actualizando usuario",
    },
};

export default t;