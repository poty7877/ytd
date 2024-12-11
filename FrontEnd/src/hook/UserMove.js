import {useNavigate} from "react-router-dom";

const UserMove = () => {

    const navigate = useNavigate();

    const moveToAgree = () => {
        navigate("../agree")
    }

    const moveToSign = () => {
        navigate("../sign")
    }

    return (
        {
            moveToSign,
            moveToAgree
        }
    );
};



export default UserMove;