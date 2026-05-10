import FormLogin from '@/components/login/FormLogin'
import { EUserRole } from '@/enum'

export default function AdminLoginPage() {
  return (
    <FormLogin requireRole={EUserRole.ADMIN} redirectTo={'/admin/dashboard'} />
  )
}
