import React from "react";
import {
 Box,
 Typography,
 FormControl,
 InputLabel,
 Input,
 Button,
 FormHelperText,
 TextField,
 Stack,
 Select,
 MenuItem,
 TextareaAutosize,
} from "@pankod/refine-mui";
import { FormProps } from "interfaces/common";
import CustomButton from "./customButton";

const Form = ({
 type,
 register,
 handleSubmit,
 handleImageChange,
 formLoading,
 onFinishHandler,
 propertyImage,
}: FormProps) => {
 return (
    <Box>
      <Typography fontSize={25} fontWeight={750} color={"#252728"}>
        {type} Property
      </Typography>
      <Box mt={2} borderRadius={5} padding={"20px"} bgcolor={"#FFFFFF"}>
        <form
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: "#252728",
                margin: "0 0 10px 0",
              }}
            >
              Property Name
            </FormHelperText>
            <TextField
              fullWidth
              required
              {...register("title", { required: true })}
              placeholder="Property Name"
              id="propertyName" // Updated to a unique ID
              variant="outlined"
              color="info"
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: "#252728",
                margin: "0 0 10px 0",
              }}
            >
              Property Description
            </FormHelperText>
            <TextareaAutosize
              {...register("description", { required: true })}
              placeholder="Property Description"
              color="info"
              required
              style={{
                width: "100%",
                height: "100px",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #252728",
                color: "#252728",
                backgroundColor: "#FFFFFF", 
              }}
            />
          </FormControl>
          <Stack direction="row" gap={2}>
            <FormControl>
              <FormHelperText
                sx={{
                 fontSize: 16,
                 fontWeight: 600,
                 color: "#252728",
                 margin: "0 0 10px 0",
                }}
              >
                Property Type
              </FormHelperText>
              <Select
                {...register("propertyType", { required: true })}
                color="info"
                variant="outlined"
                fullWidth
                required
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                defaultValue={"apartment"}
              >
                <MenuItem value="bedsitter">Bedsitter</MenuItem>
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="condos">Condos</MenuItem>
                <MenuItem value="bungalow">Bungalow</MenuItem>
                <MenuItem value="mansion">Mansion</MenuItem>
                <MenuItem value="duplex">Duplex</MenuItem>
                <MenuItem value="farmhouse">Farmhouse</MenuItem>
                <MenuItem value="chalet">Chalet</MenuItem>
                <MenuItem value="townhouse">Townhouse</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                 fontSize: 16,
                 fontWeight: 600,
                 color: "#252728",
                 margin: "0 0 10px 0",
                }}
              >
                Property Price
              </FormHelperText>
              <TextField
                {...register("price", { required: true })}
                type="number"
                placeholder="Property Price"
                id="propertyPrice" // Updated to a unique ID
                variant="outlined"
                color="info"
                fullWidth
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: "#252728",
                margin: "0 0 10px 0",
              }}
            >
              Property Location
            </FormHelperText>
            <TextField
              type="text"
              {...register("location", { required: true })}
              color="info"
              required
              placeholder="Property Location"
              id="propertyLocation" // Updated to a unique ID
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <Stack direction="column" gap={2} mb={2} justifyContent={"center"}>
            <Stack direction="row" gap={2}>
              <Typography
                color={"#252728"}
                fontWeight={600}
                fontSize={16}
                my={"10px"}
              >
                Upload Property Photo
              </Typography>

              <Input
                type="file"
                accessKey="image"
                hidden
                sx={{
                 backgroundColor: "#FFFFFF",
                 borderRadius: 1,
                 textTransform: "capitalize",
                 color: "#fff",
                 "&:hover": {
                    backgroundColor: "transparent",
                 },
                }}
                onChange={(e) => {
                 // @ts-ignore
                 handleImageChange(e.target.files[0]);
                }}
              />
            </Stack>
            <Typography
              fontSize={16}
              fontWeight={600}
              color={"#252728"}
              variant="h6"
              sx={{ wordBreak: "break-all" }}
            >
              {propertyImage?.name}
            </Typography>
          </Stack>
          <CustomButton
            type="submit"
            label={formLoading ? "Loading..." : "Submit"}
            backgroundColor={"#252728"}
            color={"#fff"}
            // handleClick={() => {}}
          />
        </form>
      </Box>
    </Box>
 );
};

export default Form;