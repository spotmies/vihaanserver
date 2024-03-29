//number
const reqNum = {
  type: Number,
  required: true,
};

//string notRequired
const nonReqStr = {
  type: String,
  required: false,
};

const userState = {
  type: String,
  required: false,
  default: "active",
  enum: ["active", "block","ban"],
};

const appConfig = {
  type: String,
  required: false,
  default: "false",
};

const defaultString = {
  type: String,
  default: "",
  required: false,
};

//string
const reqStr = {
  type: String,
  required: true,
};

//number notRequired
const nonReqNum = {
  type: Number,
  required: false,
};

//unique number
const uniqueNum = {
  type: Number,
  required: true,
  unique: true,
};

//non required coordinates
const nonReqArrNum = {
  type: [Number],
  required: false,
};
const nonReqArrStr = {
  type: [String],
  required: false,
};

const phoneNum = {
  type: Number,
  required: true,
  unique: true,
  min: 5000000000,
  max: 9999999999,
};

const numberStatus = {
  required: false,
  type: Number,
  default: 0,
};

const settingId = {
  type: String,
  required: true,
  minlength: 4,
};

const constantId = {
  type: String,
  required: true,
  minlength: 4,
  unique: true,
  immutable: true,
};

//required timestamps
const timstampValidate = (value) => {
  var n = value.toString();
  if (n.length === 13) return true;
  return false;
};
const timeStamp = {
  required: false,
  immutable: true,
  type: Number,
  min: 0000000000000,
  max: 9999999999999,
  validate: [timstampValidate, "timestamp must be length 13"],
  default: Date.now,
};
const modifiedAt = {
  required: false,
  immutable: false,
  type: Number,
  min: 0000000000000,
  max: 9999999999999,
  validate: [timstampValidate, "modifiedAt must be length 13"],
  default: Date.now,
};

const reqSchedule = {
  require: true,
  type: Number,
  min: 0000000000000,
  max: 9999999999999,
  validate: [timstampValidate, "timestamp must be length 13"],
};

const orderSchedule = {
  required: false,
  type: Number,
  min: 0000000000000,
  max: 9999999999999,
  validate: [timstampValidate, "timestamp must be length 13"],
  default: Date.now,
};
const createdAt = {
  required: false,
  immutable: true,
  type: Number,
  min: 0000000000000,
  max: 9999999999999,
  validate: [timstampValidate, "createdAt must be length 13"],
  default: Date.now,
};
const timestampId = {
  required: false,
  immutable: true,
  type: Number,
  min: 0000000000000,
  max: 9999999999999,
  validate: [timstampValidate, "createdAt must be length 13"],
  default: Date.now,
};

const responseSchedule = {
  required: false,
  type: Number,
  min: 0000000000000,
  max: 9999999999999,
  validate: [timstampValidate, "timestamp must be length 13"],
};
const upStatesAndCounts = {
  required: false,
  type: Number,
  default: 1,
};
//non required timestamps
const nonReqTimeStamp = {
  required: false,
  type: Number,
  min: 0000000000000,
  max: 9999999999999,
};

const altNum = {
  required: false,
  type: Number,
  min: 5000000000,
  max: 9999999999,
};
const unChangeUniqueStr = {
  type: String,
  unique: true,
  required: true,
  immutable: true,
  minlength: 13,
  maxlength: 13,
};
const ordIdSch = {
  unique: true,
  required: false,
  immutable: true,
  type: Number,
  min: 0000000000000,
  max: 9999999999999,
  default: Date.now,
};
const unChangeStr = {
  type: String,
  required: true,
  immutable: true,
};

//unique number notRequired
const nonReqUniqueNum = {
  type: Number,
  required: false,
  unique: true,
};

//unique String
const reqUniqueStr = {
  type: String,
  required: true,
  unique: true,
};

//unique String notRequired
const nonReqUniqueStr = {
  type: String,
  required: false,
  unique: true,
};

var validateEmail = function (email) {
  console.log(email);
  if (email == null) return true;
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const nonReqEmail = {
  required: false,
  type: String,
  unique: true,
  validate: [validateEmail, "Please fill a valid email address"],
  sparse: true,
  index: true,
};

const arrSch = [{ type: String }];

const bool = {
  type: Boolean,
};

const uIdSch = {
  type: String,
  unique: true,
  immutable: true,
  required: true,
  minlength: 4,
  trim: true,
};

const stringId = {
  type: String,
  required: true,
  minlength: 4,
};

const dobSch = {
  required: true,
  type: String,
};
const unChangeNum = {
  type: Number,
  immutable: true,
  required: true,
};
const nonReqBool = {
  required: false,
  default: false,
  type: Boolean,
};
module.exports = {
  reqNum,
  nonReqStr,
  createdAt,
  reqStr,
  nonReqNum,
  nonReqArrNum,
  uniqueNum,
  nonReqUniqueNum,
  reqUniqueStr,
  nonReqUniqueStr,
  unChangeUniqueStr,
  unChangeStr,
  arrSch,
  bool,
  uIdSch,
  dobSch,
  defaultString,
  phoneNum,
  altNum,
  nonReqEmail,
  timeStamp,
  nonReqTimeStamp,
  ordIdSch,
  modifiedAt,
  unChangeNum,
  upStatesAndCounts,
  responseSchedule,
  orderSchedule,
  nonReqBool,
  reqSchedule,
  numberStatus,
  userState,
  appConfig,
  stringId,
  settingId,
  constantId,
  nonReqArrStr
};
