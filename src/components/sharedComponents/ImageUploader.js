import React, { Fragment } from "react";

import styled from "styled-components";

import { useDropzone } from "react-dropzone";

import { Container, Icon, Button, Segment, Header } from "semantic-ui-react";
import { getPageId } from "../../utils/urls";

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
  padding-bottom: 20px !important;
`;

const StyledDiv = styled.div`
  padding-top: 10px !important;
`;

const StyledParagraph = styled.p`
  font-size: 20px !important;
  margin: 0 auto;
  font-style: oblique;
  text-align: center;
`;

const StyledContentContainer = styled(Container)`
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

const ImageUploader = ({ handleUploadImage, handleDeleteImage, onClose }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const onProfilePage = getPageId() === "user-profile";
  const hasSelectedImage = files.length !== 0;

  return (
    <Fragment>
      <Segment placeholder>
        <Header icon>
          <Icon name="image" />
          {onProfilePage ? "Update profile Image" : "Update article image"}
        </Header>
        <StyledContainer className="container">
          {!hasSelectedImage ? (
            <StyledContentContainer>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <StyledParagraph>
                  Drag 'n' drop an image here, or click to select from your
                  files
                </StyledParagraph>
              </div>
            </StyledContentContainer>
          ) : (
            <aside>
              <h4>Image selected</h4>
              {files}
            </aside>
          )}
        </StyledContainer>

        <Segment.Inline>
          <Button
            onClick={() => handleUploadImage(acceptedFiles[0])}
            disabled={!hasSelectedImage}
          >
            <Icon name="upload" />
            Upload
          </Button>
          <Button color="red" onClick={() => onClose()}>
            Cancel
          </Button>
        </Segment.Inline>
        <StyledDiv>
          <Button color="blue" onClick={() => handleDeleteImage("image")}>
            {onProfilePage ? "Remove Profile Image" : "Remove Article Image"}
          </Button>
        </StyledDiv>
      </Segment>
    </Fragment>
  );
};

export default ImageUploader;
