import grpc from "grpc";
import { serverpbClient } from "../proto/ServerServiceClientPb";

export default new serverpbClient(
    "http://localhost:8000",
    // grpc.credentials.createInsecure(),
)