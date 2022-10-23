import { Button, FileButton, Group, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";

type BtnUploaderProps = {
  btnTitle: string;
  render?: (file: File | null) => JSX.Element;
  onChange?: (file: File) => void;
  accept?: string;
  btnPosition?: "after" | "before";
  resetOnCancel?: boolean;
};

const BtnSingleUploader = ({
  btnTitle,
  render,
  onChange,
  accept,
  btnPosition,
  resetOnCancel,
}: BtnUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    onChange && file && onChange(file);
  }, [file]);

  return (
    <>
      {btnPosition !== "after" ? (
        <Group position="left">
          <FileButton
            onChange={(e) => {
              if (resetOnCancel === true) {
                setFile(e);
              } else {
                if (e) {
                  setFile(e);
                }
              }
            }}
            accept={accept}
          >
            {(props) => (
              <Button id={"file"} {...props}>
                {btnTitle}
              </Button>
            )}
          </FileButton>
        </Group>
      ) : (
        <></>
      )}
      {(render && render(file)) ??
        (file && (
          <>
            <Text size="xs" align="left">
              Picked file: {file.name}
            </Text>
            <Image
              width={160}
              height={160}
              radius="md"
              src={URL.createObjectURL(file)}
              alt="Random unsplash image"
              className="mt-2 select-none rounded-lg border object-cover shadow-xl"
            />
          </>
        ))}

      {btnPosition === "after" ? (
        <Group position="left">
          <FileButton onChange={setFile} accept={accept}>
            {(props) => (
              <Button id={"file"} {...props}>
                {btnTitle}
              </Button>
            )}
          </FileButton>
        </Group>
      ) : (
        <></>
      )}
    </>
  );
};

export default BtnSingleUploader;
