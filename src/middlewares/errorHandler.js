export const errorHandler = (err, req, res, _next) => {
  console.error(err);

  if (err.code === "P2002") {
    return res.status(409).json({
      message: `Duplicate value for field: ${err.meta?.target}`,
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.status(500).json({
    message: "Internal server error",
  });
};
