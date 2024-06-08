import AdminAccountForm from "../../components/AdminAccountForm"

const ProfileDash = () => {
  return (
    <div className="w-full">
      <div className="flex mb-6 justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <AdminAccountForm />
    </div>
  )
}

export default ProfileDash