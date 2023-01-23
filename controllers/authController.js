import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import attachCookie from "../utils/attachCookies.js";

const register = async function(req,res)
{

    const {name, email, password} = req.body;

    if(!name || !email || !password)
    {
        throw new BadRequestError("Please provide all values.");
    }

    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists)
    {
        throw new BadRequestError("Email already exist");
    };

    // res.send("Registered User");

    //1st Method
    // try {
    //     const user = await User.create(req.body);
    //     res.status(201).json({ user });
    // } catch (error) {
    //     // res.status(500).json({ msg: "There was an error." });
    //     next(error);
    // }

    //2nd Method
    const user = await User.create({name, email, password});
    const token = user.createJWT();

    attachCookie({ res, token });

    res.status(StatusCodes.CREATED).json({
        user:{
            email:user.email, 
            lastName:user.lastName, 
            location:user.location, 
            name:user.name
        },
        location: user.location
    });
};

const login = async function(req,res)
{
    const {email,password} = req.body;
    if(!email || !password)
    {
        throw new BadRequestError("Please provide all values.");
    }
    
    const user = await User.findOne({ email }).select('+password');
    if(!user)
    {
        throw new UnAuthenticatedError("Invalid Credentials");
    }

    console.log(user);

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect)
    {
        throw new UnAuthenticatedError("Invalid Credentials");
    }

    const token = user.createJWT();
    user.password = undefined;

    attachCookie({ res, token });

    res.status(StatusCodes.OK).json({
        user,
        location: user.location
    });
};

const updateUser = async function(req,res)
{ 
    const { email, name, lastName, location } = req.body;
    
    if(!name || !email || !lastName || !location)
    {
        throw new BadRequestError("Please provide all values.");
    }
    
    const user = await User.findOne({ _id: req.user.userId })

    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;

    await user.save();

    const token = user.createJWT();

    attachCookie({ res, token });

    res.status(StatusCodes.OK).json({
        user,
        location: user.location,
    });
};

const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(StatusCodes.OK).json({ user, location: user.location });
};

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: 'User logged out!' });
};

export { register, login, updateUser, getCurrentUser, logout };