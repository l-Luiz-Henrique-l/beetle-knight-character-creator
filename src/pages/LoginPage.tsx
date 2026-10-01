import Brand from '@/components/shared/brand'


import FormLogin from '@/form/form-login'
import { Link } from 'react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

function LoginPage() {
  return (
    <section className="flex-1 flex items-center justify-center py-20">
      
      <Card className="w-full max-w-md border-border">
        
        <CardHeader className="text-center">

          <div className="w-full flex justify-center mb-4">
            <Brand />
          </div>

          <CardTitle className="text-2xl font-bold text-foreground">
            Entrar na Conta
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            Acesse suas fichas de Beetle Knight
          </CardDescription>

        </CardHeader>

        <CardContent className="space-y-4">
          <FormLogin />
        </CardContent>

        <CardFooter className="border-t border-border">
          <p className="text-sm text-muted-foreground text-center w-full">
            Não tem conta?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Criar conta
            </Link>
          </p>
        </CardFooter>

      </Card>

    </section>
  )
}

export default LoginPage