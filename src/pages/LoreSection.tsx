import besouro from "@/assets/besouro.png"

function LoreSection() {
  return (
    <section className="bg-card py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">


        <div className="flex justify-center">
          <img
            src={besouro}
            alt="Besouro Cavaleiro"
            className="max-w-xs md:max-w-md drop-shadow-xl"
          />
        </div>

        <div className="space-y-4 text-foreground">
          
          <h2 className="text-3xl font-bold">
            Um Reino em Decadência
          </h2>

          <p className="text-muted-foreground">
            Uma doença misteriosa se espalha pelas profundezas da fortaleza da Milípede,
            consumindo tudo como um incêndio silencioso. Ninguém sabe sua origem
            talvez algo esquecido pelos antigos cupins.
          </p>

          <p className="text-muted-foreground">
            Insetos desaparecem, territórios se fecham e forças estranhas começam a agir.
            Os louva-a-deus bloqueiam caminhos, enquanto o medo silencia aqueles que sabem demais.
          </p>

          <p className="text-muted-foreground">
            Como um Cavaleiro da antiga ordem, você deve explorar esse mundo fragmentado,
            descobrir seus segredos e enfrentar ameaças que vão além da compreensão.
          </p>

        </div>

      </div>

    </section>
  )
}

export default LoreSection