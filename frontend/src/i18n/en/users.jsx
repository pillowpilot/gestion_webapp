const t = {
    list: {
        header: "Users",
        newBtn: "New User",
        datagrid: {
            id: "ID",
            name: "Name",
            lastname: "Lastname",
            role: "Role",
            email: "Email",
            actions: "Actions",
        },
    },
    create: {
        header: "Create a new user",
        saveBtn: "Save",
        goBackBtn: "Go Back",
        labels: {
            name: "Name",
            lastname: "Lastname",
            email: "Email",
            password: "Password",
            uploadPhoto: "Upload photo",
            allowedFormats: "Allowed *.jpeg, *.jpg, *.png",
            maxSize: "Max size of 3Mb",
        },
        errors: {
            requiredName: "Name is required",
            requiredLastname: "Lastname is required",
            requiredEmail: "Email is required",
            requiredPassword: "Password is required",
        },
        successMsg: "User created successfully",
    },
    details: {
        saveBtn: "Save",
        goBackBtn: "Go Back",
        updateSuccessMsg: "User updated successfully",
        updateErrorMsg: "Error updating user",
    },
};

export default t;