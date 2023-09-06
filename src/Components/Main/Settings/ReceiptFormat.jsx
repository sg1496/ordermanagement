import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../Store/Slice/NavSlices';
import Buttons from '../ProductComponent/Buttons/NewButtons';
const ReceiptFormat = () => {
const dispatch = useDispatch()
dispatch(navTitle("Settings"))


    const editorRef = useRef(null);
    
    return (
        <div className="addProduct__basicTab">
            <form>

                <div className="addProduct__basicForm d-flex mb-4">
                    <div className="addProduct__productNamed">
                        <label htmlFor="product-name" className="form-label inputForm__label">
                            Store Name:
                            <span className="formRequired">*</span>
                        </label>
                        <input
                            type="text"
                            id="product-name"
                            className="form-control"
                            placeholder="xyz pizza"
                            required
                        />
                    </div>
                </div>
                <div className="addProduct__basicForm d-flex mb-4 ">
                    <div className="addProduct__productName">
                        <label htmlFor="product-name" className="form-label inputForm__label">
                            Receipt Form:
                            <span className="formRequired">*</span>
                        </label>
                        <div >
                            <Editor
                                apiKey="7os7on7fgytrx4vtoo4qiyhsn7zl9wxvbig8oixqjb1jkvzf"
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue="<p>This is the initial content of the editor.</p>"
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss'
                                    ],
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />


                        </div>
                    </div>

                </div>
                <div>
                    <Buttons fname="Save"
                        Sname="Cancel" />
                </div>
            </form>
        </div>
    )
}
export default ReceiptFormat;