import React, { Fragment } from "react";

import styled from "styled-components";

import { useDropzone } from "react-dropzone";

import { Container, Icon, Button } from "semantic-ui-react";

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const StyledContainer = styled(Container)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const ImageUploader = ({ handleUploadImage, handleDeleteImage }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const hasSelectedImage = files.length !== 0;

  return (
    <Fragment>
      <Container className="container" style={{ paddingBottom: 20 }}>
        {!hasSelectedImage && (
          <StyledContainer>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some image here, or click to select files</p>
            </div>
          </StyledContainer>
        )}
        {hasSelectedImage && (
          <aside>
            <h4>Image selected</h4>
            {files}
          </aside>
        )}
      </Container>

      <Button floated="right" color="blue" onClick={() => handleDeleteImage()}>
        <Icon name="delete" />
        Remove
      </Button>
      <Button
        floated="right"
        onClick={() => handleUploadImage(acceptedFiles[0])}
      >
        Done
      </Button>
    </Fragment>
  );
};

export default ImageUploader;
