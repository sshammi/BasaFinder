import express from 'express'
import { BlogController } from '../blog/blog.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ListingValidation } from './blog.validation';

const router=express.Router();

router.post('',auth('landlord'),validateRequest(ListingValidation.ListingCreateValidationSchema),BlogController.createBlog)

router.get('/my/:id',auth('landlord'),BlogController.getMyBlogs)

router.patch('/:id',auth('landlord','admin'),validateRequest(ListingValidation.ListingUpdateValidationSchema),BlogController.updateBlog)
router.delete('/:id',auth('landlord','admin'),BlogController.deleteBlog)

router.get('',BlogController.getAllBlogs)

router.get('/:id',BlogController.getSingleBlogs)

export const BlogRoutes=router;