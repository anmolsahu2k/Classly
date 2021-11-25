import mongoose from "mongoose";

const chatAnalysisSchema = new mongoose.Schema({


    handlerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    report: {
        type: String
    }

});

const InterviewAnalysisUser = mongoose.model("InterviewAnalysisUser", interviewAnalysisUserSchema);

export default InterviewAnalysisUser