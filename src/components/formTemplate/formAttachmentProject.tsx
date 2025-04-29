import React from 'react'
import { Dialog } from "../../base-components/Headless";
import { useEffect, useRef, useState } from "react";
import { FormInput } from "../../base-components/Form";
import Button from "../../base-components/Button";

const formAttachmentProject = (props:any) => {
    const {showModal, setShowModal, submitAttachment, chageFile, project, project_uuid, set_project_uuid} = props;

    const sendButtonRef = useRef(null);
    
    return (
        <div>
            <Dialog
                open={showModal}
                onClose={() => {
                setShowModal(false);
                }}
                initialFocus={sendButtonRef}
            >
                <Dialog.Panel>
                <Dialog.Title>
                    <h2 className="mr-auto text-base text-sm font-medium">
                        Attachment
                    </h2>
                </Dialog.Title>
                <form onSubmit={submitAttachment}>
                    <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3 text-xs">
                        <div className="col-span-12 sm:col-span-12">
                            <FormInput
                                id="modal-form-1"
                                type="file"
                                formInputSize='sm'
                                placeholder="file"
                                onChange={chageFile}
                            />
                        </div>
                    </Dialog.Description>
                    <Dialog.Footer className="flex gap-x-4 justify-end">
                        <Button
                        type="button"
                        variant="outline-secondary"
                        size='sm'
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
                        size='sm'
                        className="w-20"
                        ref={sendButtonRef}
                        >
                        Upload
                        </Button>
                    </Dialog.Footer>
                </form>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}

export default formAttachmentProject