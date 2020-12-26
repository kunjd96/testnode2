const asyncHandler = require('../middleware/async');
const TestData = require('../models/testmodel');
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');


exports.getAllTestData = asyncHandler(async(req, res, next) => {
    const allTestData = await TestData.find();
    res.status(200).json({ sucess: true, data: allTestData });
});

exports.singleTestData = asyncHandler(async(req, res, next) => {

    const singleTestData = await TestData.findById(req.params.id);
    if (!singleTestData) {
        return next(new ErrorResponse('Bootcamp not found with id', 404));
    }
    res.status(200).json({ sucess: true, data: singleTestData });

});


exports.createTestData = asyncHandler(async(req, res, next) => {

    const createTestData = await TestData.create(req.body);
    res.status(200).json({ sucess: true, data: createTestData });

});

exports.updateTestData = asyncHandler(async(req, res, next) => {

    const updateTestData = await TestData.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updateTestData) {
        return next(new ErrorResponse('Bootcamp not found with id', 404));
    }
    res.status(200).json({ sucess: true, data: updateTestData });
});

exports.deleteTestData = asyncHandler(async(req, res, next) => {

    const deleteTestData = await TestData.findById(req.params.id);
    if (!deleteTestData) {
        return next(new ErrorResponse('Bootcamp not found with id', 404));
    }
    deleteTestData.remove();
    res.status(200).json({ sucess: true, data: {} });

});

exports.uploadFileTest = asyncHandler(async(req, res, next) => {

    const uploadFileTest = await TestData.findById(req.params.id);
    if (!uploadFileTest) {
        return next(new ErrorResponse('Bootcamp not found with id', 404));
    }
    if (!req.files) {
        return next(new ErrorResponse('Plase Upload Photo', 400));
    }
    console.log(req.files);
    const file = req.files.file;
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse('Please Upload Imag File', 400));
    }

    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please Upload Imag File less then ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;
    console.log(file.name);

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse('Problem with file upload', 500));
        }
        await TestData.findByIdAndUpdate(req.params.id, { photo: file.name });
        res.status(200).json({ sucess: true, data: file.name });
    });

    // res.status(200).json({ sucess: true, data: {} });

});