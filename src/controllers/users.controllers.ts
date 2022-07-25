import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";


const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      status: "Success",
      data: { ...user },
      message: "User Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getMany();
    res.json({
      status: "Success",
      message: "Done",
      data: [user],
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as string); 
    res.json({
      status: "Success",
      message: "Done",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateOne(req.body);
    res.json({
      status: "Success",
      message: "Done",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as string);
    res.json({
      status: "User Deleted Successfully",
      message: "Done",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
// authenticate
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    const token = jwt.sign(
      { user},
      process.env.TOKEN_SECRET as string
    );
    if (!user) {
      return res.status(401).json({
        status: "Error",
        message: "The user name and password do not match please try again",
      });
    }
    return res.json({
      status: "Success",
      data: { ...user, token },
      message: "User Authenticated Successfully",
    });
  } catch (error) {
    return next(error);
  }
};