import { useState } from "react";
import axios from "axios";

const useExecuteCode = () => {
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const executeCode = async (language, code, input = "") => {
        setLoading(true);
        setError(null);
        setOutput(null);

        try {
            const res = await axios.post("http://localhost:3000/api/execute", {
                code,
                language,
                input,
            });
            console.log(res);


            const result = res.data.output || res.data;
            setOutput(result);
            return result; // ✅ return this to update local output too
        } catch (err) {
            console.log(err);

            const errorMsg = err.response?.data?.error || "Something went wrong while executing the code";
            setError(errorMsg);
            return errorMsg; // ✅ return error so component can handle
        } finally {
            setLoading(false);
        }
    };

    return { executeCode, output, loading, error };
};

export default useExecuteCode;