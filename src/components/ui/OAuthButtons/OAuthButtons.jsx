export default function OAuthButtons({ onGoogle, onLinkedIn }) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <button
        type="button"
        onClick={onGoogle}
        className="btn-outline w-full"
      >
        Continue with Google
      </button>
      <button
        type="button"
        onClick={onLinkedIn}
        className="btn-outline w-full"
      >
        Continue with LinkedIn
      </button>
    </div>
  );
}
