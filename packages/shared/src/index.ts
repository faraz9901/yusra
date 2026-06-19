export const DeploymentStatus = {
    PENDING: "PENDING",
    BUILDING: "BUILDING",
    RUNNING: "RUNNING",
    FAILED: "FAILED"
} as const;

export type DeploymentStatus =
    (typeof DeploymentStatus)[keyof typeof DeploymentStatus];