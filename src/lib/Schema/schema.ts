import mongoose from 'mongoose';
import dbConnect from '../DB_Connection/dbConnection';
dbConnect()
const UserSchemaData = new mongoose.Schema({
  NanoId: { type: String, ref: "NanoId", required: false },
  name: { type: String, ref: "name", required: false },
  email: { type: String, ref: "email", required: false },
  password: { type: String, ref: "password", required: false },
  userImg: { type: String, ref: "userImg", required: false },
  contact: { type: String, ref: "contact", required: false },
  address: {
    division: { type: String, ref: "division", required: false },
    district: { type: String, ref: "district", required: false },
    thana: { type: String, ref: "thana", required: false },
    postOffice: { type: String, ref: "postOffice", required: false },
    postCode: { type: String, ref: "postCode", required: false },
  },
  recentDate: { type: String, ref: "userImg", required: false },
  isVerify: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  token: String,
  tokenVerified: Date,
  forgotPassword: String,
  forgotPasswordVerified: Date,
  dateField: {
    type: Date,
    default: Date.now,
    required: [false, "fill the data"],
  },
});

export const UserSchema =
  mongoose.models.users || mongoose.model("users", UserSchemaData);
















// --------------------------------------------
const PdfSchema = new mongoose.Schema({
  pdf_name: { type: String, required: false },
  pdf: { type:String, required: false },
  recentDate: { type: String, required: false },
  dateField:{
    type:Date,
    default:Date.now,
  }
});

export const PdfSchemaStr = mongoose.models.pdf_s|| mongoose.model('pdf_s', PdfSchema);


const MyProjects = new mongoose.Schema({
  NanoId:  { type:String, ref: 'NanoId', required: false },
  projectTitle: { type:String, ref: 'projectTitle', required: false },
  projectLink: { type:String, ref: 'projectLink', required: false },
  descriptions:{ type:String, ref: 'descriptions', required: false },
  projectImage:{ type:String, ref: 'projectImage', required: false },
  projectType: {type:String, ref:'projectType', required: false},
  likes:[],
  comments:[],
  recentDate:{ type:String, ref: 'recentDate', required: false },
  createdAt: { type: Date, default: Date.now },

})

export const Projects_Str = mongoose.models.my_projects|| mongoose.model("my_projects",MyProjects)

const ImageSchema = new mongoose.Schema({
  image_url:{
    type:String,
    required:true

  },
  public_id:{
    type:String,
    required:true
  }
},{ timestamps:true})
export const ImageGallary = mongoose.models.image_gallaries|| mongoose.model("image_gallaries",ImageSchema)
