import { Dialog } from "../../base-components/Headless";
import { useEffect, useRef, useState } from "react";
import Button from "../../base-components/Button";
import { FormInput } from "../../base-components/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadCarReservationAttachment,
  deleteCarReservationAttachment,
  resetCarReservationAttachment,
} from "../../stores/features/carReservationAttachmentSlice";

export const uploadDataAttachment = (datas: any) => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);
  const sendButtonRef = useRef(null);

  const dispatch = useDispatch();

  const {
    data,
    isError,
    isSuccess,
    isLoading,
    message: messageAttachment,
  } = useSelector((state: any) => state.car_reservation_attachment);

  useEffect(() => {
    if (isSuccess && messageAttachment) {
      if (!isLoading) {
        setFile(null);
        setMessage(messageAttachment);
        setShowModal(false);
        dispatch(resetCarReservationAttachment());
        datas.reload();
      }
    }
  }, [isSuccess, messageAttachment, isLoading]);

  const chageFile = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const submitAttachment = (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    dispatch(
      uploadCarReservationAttachment({
        uuid: datas.uuid,
        formData,
      }),
    );
  };

  const deleteFileAttachment = (data: any) => {
    dispatch(deleteCarReservationAttachment({ uuid: data.uuid }));
  };

  const modal = (
    <Dialog
      open={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      initialFocus={sendButtonRef}
    >
      <Dialog.Panel>
        <Dialog.Title>
          <h2 className="mr-auto text-base text-sm font-medium">Attachment</h2>
        </Dialog.Title>
        <form onSubmit={submitAttachment}>
          <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3 text-xs">
            <div className="col-span-12 sm:col-span-12">
              <FormInput
                id="modal-form-1"
                type="file"
                formInputSize="sm"
                placeholder="file"
                onChange={chageFile}
              />
            </div>
          </Dialog.Description>
          <Dialog.Footer className="flex gap-x-4 justify-end">
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              onClick={() => {
                setShowModal(false);
              }}
              className="w-20"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              size="sm"
              className="w-20"
              ref={sendButtonRef}
            >
              Upload
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Panel>
    </Dialog>
  );

  return { modal, deleteFileAttachment, showModal, setShowModal };
};
