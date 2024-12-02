import {MdRemoveRedEye} from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import {IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import moment from "moment";

const truncateText = (text) => {
    if (text.length < 300) return text;

    return text.substring(0, 300) + ".....";
};

const NoteItems = ({parsedContent, id, createdAt}) => {
    const formattedDate = moment(createdAt).format("D MMMM YYYY");
    return (
        <div
            data-test-element='note-item'
            data-test-id={id}
            className="sm:px-5 px-2 py-5 shadow-md bg-noteColor shadow-white rounded-lg min-h-96 max-h-96 relative overflow-hidden"
        >
            <p
                className="text-black font-customWeight ql-editor"
                dangerouslySetInnerHTML={{__html: truncateText(parsedContent)}}
            />
            <div
                className="flex justify-between items-center absolute bottom-5 sm:px-5 px-2 left-0 w-full text-slate-700"
            >
                <span>{formattedDate}</span>
                <Link to={`/notes/${id}`}>
                    <Tooltip title="View Note">
                        <IconButton id={`view-note-${id}`}>
                            <MdRemoveRedEye className="text-slate-700"/>
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
        </div>
    );
};

export default NoteItems;
