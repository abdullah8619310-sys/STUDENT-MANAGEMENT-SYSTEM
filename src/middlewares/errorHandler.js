export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === 'P2002') {
    return res.status(409).json({
      message: `Duplicate value for field: ${err.meta?.target}`,
    });
  }

  res.status(500).json({
    message: 'Internal server error',
  });
};