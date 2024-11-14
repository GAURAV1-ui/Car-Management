import { Request, Response } from 'express';
import Car from '../models/car.model';
import { AuthRequest } from '../middleware/auth.middleware';

export const createCar = async (req: AuthRequest, res: Response) => {
  const { title, description, tags } = req.body;
  const images = (req.files as Express.Multer.File[])?.map((file: Express.Multer.File) => file.path) || [];

  try {
    const car = new Car({
      userId: req.user,
      title,
      description,
      tags,
      images,
    });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCar = async (req: AuthRequest, res: Response) => {
    const { title, description, tags } = req.body;
    const newImages = (req.files as Express.Multer.File[])?.map((file: Express.Multer.File) => file.path) || [];
  
    try {
      const car = await Car.findById(req.params.id);
      if (!car) return res.status(404).json({ message: 'Car not found' });
  
      if (car.userId.toString() !== req.user) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      car.title = title || car.title;
      car.description = description || car.description;
      car.tags = tags || car.tags;
      car.images = newImages.length ? newImages : car.images;
  
      await car.save();
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const getCars = async (req: AuthRequest, res: Response) => {
    try {
      const cars = await Car.find({ userId: req.user });
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  export const searchCars = async (req: AuthRequest, res: Response) => {
    const { q } = req.query;
    try {
      const cars = await Car.find({
        userId: req.user,
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { tags: { $regex: q, $options: 'i' } },
        ],
      });
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  
  export const deleteCar = async (req: Request, res: Response) => {
    try {
      const car = await Car.findByIdAndDelete(req.params.id);
      if (!car) return res.status(404).json({ message: 'Car not found' });
      res.json({ message: 'Car deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
