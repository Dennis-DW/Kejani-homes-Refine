import React, { useMemo } from "react";
import { useTable } from "@pankod/refine-core";
import {
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { PropertyCard, CustomButton } from "components";
import { Add } from "@mui/icons-material";
// import { set } from "@pankod/refine-react-hook-form";

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  // console.log(data);
  const allProperties = data?.data ?? [];

  const currentPrice = sorter.find((item) => item.field === "price")?.order;
  const togglePriceSort = (field: string) => {
    setSorter([
      { field: "price", order: currentPrice === "asc" ? "desc" : "asc" },
    ]);
  };

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? [item] : []
    );
    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
      propertyType:
        logicalFilters.find((item) => item.field === "propertyType")?.value ||
        "",
    };
  }, [filters]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (isError) {
    return <Typography>Something went wrong</Typography>;
  }

  return (
    <Box>
      <Box
        mt={"20px"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Stack>
          <Typography
            fontSize={25}
            fontWeight={700}
            color={"#0d1321"}
            variant="h4"
          >
            {!allProperties.length
              ? "There are no available Properties"
              : "All Properties"}{" "}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"wrap"}
          >
            <Box
              display={"flex"}
              gap={5}
              flexWrap={"wrap"}
              mb={{ xs: 2, sm: 0 }}
            >
              <CustomButton
                label={`Sort Price ${currentPrice === "asc" ? "↓" : "↑"}
                `}
                handleClick={() => togglePriceSort("price")}
                backgroundColor="#697089"
                color="#fff"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by Title"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "title",
                      operator: "contains",
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: "propertyType",
                        operator: "eq",
                        value: e.target.value,
                      },
                    ],
                    "replace"
                  );
                }}
                defaultValue={""}
                value={currentFilterValues.propertyType}
              >
                <MenuItem value="">All</MenuItem>
                {[
                  "Bedsitter",
                  "Apartment",
                  "House",
                  "Villa",
                  "Bungalow",
                  "Duplex",
                  "Chalet",
                  "Condos",
                  "Farmhouse",
                  "Townhouse",
                ].map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomButton
          label="Create Property"
          handleClick={() => navigate("/properties/create")}
          backgroundColor="#697089"
          color="#fff"
          icon={<Add />}
        />
      </Stack>
      <Box mt={4} sx={{ display: "flex", gap: 5 }}>
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            // description={property.description}
            price={property.price}
            location={property.location}
            photo={property.photo}
          />
        ))}
      </Box>
      {allProperties.length > 0 && (
        <Box
          mt={4}
          display="flex"
          justifyContent="center"
          flexWrap={"wrap"}
          sx={{
            gap: 3,
          }}
        >
          <CustomButton
            label="Load More"
            handleClick={() => setCurrent(current + 1)}
            backgroundColor="#C7CBD8"
            color="#fff"
            disabled={current === pageCount}
          />
          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems={"center"}
            justifyContent={"center"}
            gap={5}
          >
            Page{""}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>
          <CustomButton
            label="Prev"
            handleClick={() => setCurrent(current - 1)}
            backgroundColor="#C7CBD8"
            color="#fff"
            disabled={current === 1}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            onChange={(e) =>
              setPageSize(e.target.value ? Number(e.target.value) : 5)
            }
            defaultValue={"5"}
            value=""
          >
            {[5, 10, 15, 20].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize}>
                {pageSize}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllProperties;
