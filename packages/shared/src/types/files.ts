export interface FileMetadata {
  /** UUID V4 */
  id: string;
  /** Original filename (e.g., "session_notes.pdf") */
  fileName: string;
  /** Full path in Firebase Storage (e.g., "patients/123/session_notes.pdf") */
  storagePath: string;
  /** Public or signed URL for downloading */
  downloadUrl: string;
  /** Size in bytes (Critical for Quota Engine) */
  sizeBytes: number;
  /** MIME type (e.g., "application/pdf", "audio/mpeg") */
  mimeType: string;
  /** Authentication UID of the uploader */
  uploadedBy: string;
  /** ISO Date string */
  uploadedAt: string;
  /** Scope context for access control */
  context: {
    patientId?: string;
    tenantId?: string;
    sessionId?: string;
  };
  /** Soft deletion flag for recycling bin features */
  isDeleted?: boolean;
}
