import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },

confirmPassword: {
    type: String,
    required: [true, "Confirm Password is required"]
},

    gender: {
        type: String,
        enum: ["male", "female"]
    },
    jobRole: {
        type: String,
        enum: ["user", "admin"],
        required:[true, "jobRole is required"],
        default:"user"
    },
    address:"String",
    country: {type:String,
    default:"Rwanda"},

    departement: String,

    passwordChangedTime:{

        type:String,
        default:Date.now()
    }
});

const UserData = mongoose.model("user",userSchema);

export default UserData;

// class UserData {

//     constructor(id, firstName, lastName, email, password, gender, role, department, address) {
//         this.id = id,
//             this.firstName = firstName,
//             this.lastName = lastName,
//             this.email = email,
//             this.password = password,
//             this.gender = gender,
//             this.role = role,
//             this.department = department,
//             this.address = address
//     }

// }

// export default UserData;

