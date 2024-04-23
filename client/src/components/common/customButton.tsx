import React from "react";
import { Button } from "@pankod/refine-mui";
import { CustomButtonProps } from "interfaces/common";

const customButton = ({
  type,
  label,
  backgroundColor,
  color,
  fullWidth,
  icon,
  disabled,
  handleClick,
}: CustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      type={type === "submit" ? "submit" : "button"}
      sx={{
        flex: fullWidth ? 1 : "unset",
        padding: "10px 20px",
        fontSize: 16,
        fontWeight: 600,
        minWidth: 150,
        borderRadius: 8,
        gap: 10,
        backgroundColor: backgroundColor,
        color: color,
        width: fullWidth ? "100%" : "fit-content",
        textTransform: "capitalize",
        "&:hover": {
          opacity: 0.8,
          backgroundColor: backgroundColor,
        },
      }}
      onClick={handleClick}
    >
      {icon}
      {label}
    </Button>
  );
};

export default customButton;
