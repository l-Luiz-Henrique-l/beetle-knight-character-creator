
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import FormRegister from '@/form/form-register'
import Brand from '@/components/shared/brand'
import { Link } from 'react-router'



function RegisterPage() {
  return (
    <section className="flex-1 flex items-center justify-center py-20">
      
      <Card className="w-full max-w-md border-border">
        
        <CardHeader className="text-center">

          <div className="w-full flex justify-center mb-4">
            <Brand />
          </div>

          <CardTitle className="text-2xl font-bold text-foreground">
            Criar sua Conta
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            Gerencie suas fichas de Beetle Knight
          </CardDescription>

        </CardHeader>

        <CardContent>
          <FormRegister />
        </CardContent>

        <CardFooter className="border-t border-border">
          <p className="text-sm text-muted-foreground text-center w-full">
            Já tem conta?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </CardFooter>

      </Card>

    </section>
  )
}

export default RegisterPage