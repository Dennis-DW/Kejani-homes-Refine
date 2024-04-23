import { TitleProps, useRouterContext } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";
import React from "react";
import { logo, kejani } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="Kejani Homes" width="120px" />
        ) : (
          <img src={kejani} alt="Kejani Homes" width="175px" />
        )}
      </Link>
    </Button>
  );
};
