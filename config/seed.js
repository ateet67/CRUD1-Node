const mongoose = require("mongoose");
const Capability = require("../models/capability.model");
const Role = require("../models/role.model");
const users = require("../controllers/users.controller");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const CAPABILITIES = {
    UPDATE_USERS: {
        capability: 'updateUsers',
        description: 'Update the data of all users',
    },
    VIEW_USERS: {
        capability: 'viewUsers',
        description: 'View public data of users',
    },
    UPDATE_OWN_RECORD: {
        capability: 'updateUserOwn',
        description: 'Update user own data',
    }
};

const ROLES_TO_SEED = [
    {
        role: 'super_admin',
        description: 'Administrator',
        capabilities: [CAPABILITIES.UPDATE_USERS, CAPABILITIES.VIEW_USERS],
    },
    {
        role: 'admin',
        description: 'Administrator',
        capabilities: [CAPABILITIES.VIEW_USERS],
    },
    {
        role: 'viewer',
        description: 'Viewer',
        capabilities: [CAPABILITIES.VIEW_USERS, CAPABILITIES.UPDATE_OWN_RECORD],
    }
];

const seedDB = async () => {
    await connectToDb();
    await seedRoles();
    await createAdminUser();
};

const connectToDb = async () => {
    if (!process.env.DB_URL) throw new Error('process.env.DB_URL is not defined.');

    console.info('Connecting to database...');
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.info('Connected \n');
};

const seedRoles = async () => {
    console.log('Seeding Roles...');
    // runs sequentially to skip creating duplicate capabilities
    for (const role of ROLES_TO_SEED) {
        await findOrCreateRole(role);
    }
    console.log('Complete \n');
};

const findOrCreateRole = async ({ capabilities, role, ...defaults }) => {
    console.info('Looking for role: ', role);
    const fromDb = await Role.findOne({ role }).exec();

    if (fromDb) {
        console.info('Role already exists skipping... \n');
        return fromDb;
    }

    console.info('Role does not exist - creating new \n');
    const doc = new Role({ role, ...defaults });

    // All capabilities (per role) can be created/found in parallel
    const roleCapabilities = await Promise.all(capabilities.map(findOrCreateCapability));
    doc.capabilities = roleCapabilities.map(c => c._id);

    await doc.save();
    console.info('Role created: ', role);
    console.info('');
    return doc;
};

const findOrCreateCapability = async ({ capability, ...defaults }) => {
    console.info('Looking for capability: ', capability);
    let doc = await Capability.findOne({ capability }).exec();
    if (doc) {
        console.info(`Capability ${capability} found - using existing...`);
    }
    else {
        console.info(`Capability ${capability} does not exist - creating new`);
        doc = new Capability({ capability, ...defaults });
        await doc.save();
    }

    return doc;
};

const createAdminUser = async () => {
    console.log("Creating Admin User...");
    let encpsw = await bcrypt.hash("Admin123", 10);
    let jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(
        { roles: ["super_admin"] },
        jwtSecret
    );

    await userModel.deleteOne({ Email: "ateetprajapati2425@gmail.com" });
    // Create a User
    const user = new userModel({
        Name: "Ateet Prajapati",
        Contact: 9328409012,
        Email: "ateetprajapati2425@gmail.com",
        Address: "142 Akhand anand society dabholi road surat",
        Password: encpsw,
        tokens: [
            {
                roleToken: token
            }
        ]
    });

    // Save User in the database
    await user
        .save(user)
        .then((data) => {
            console.log("Admin User Created..");
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.seeding = async () => {
    await seedDB()
        .then(() => {
            console.info('Exiting...: ');
            process.exit(0);
        })
        .catch(error => {
            console.error('Seed failed');
            console.error(error);
            process.exit(1);
        });
}


