import { cn } from "@utils";
import { ArrowTopRightOnSquareIcon } from "@icons/mini";

interface Tecnologies {
  name: string;
  url: string;
}

const tecnologies: Tecnologies[] = [
  {
    name: "React",
    url: "https://react.dev/",
  },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "Tailwind",
    url: "https://tailwindcss.com/",
  },
  {
    name: "React Router",
    url: "https://reactrouter.com/en/main",
  },
  {
    name: "React Hook Form",
    url: "https://www.react-hook-form.com/",
  },
  {
    name: "TanStack Query",
    url: "https://tanstack.com/query/latest",
  },
  {
    name: "Zod",
    url: "https://zod.dev/",
  },
  {
    name: "Vite",
    url: "https://vitejs.dev/",
  },
];

const Welcome = () => {
  return (
    <div
      className={cn(
        "flex max-w-[42rem] flex-col gap-6 rounded-lg p-5",
        "bg-gray-50 text-gray-600",
        "dark:bg-black-700 dark:text-black-100",
      )}
    >
      <p className="text-lg">
        Bem-vindo(a) ao <span className="text-lg font-semibold uppercase tracking-wider">Dash Multas</span>!
      </p>
      <p>
        Estou empolgado em apresentar este projeto que visa fornecer uma interface fácil e intuitiva para
        gerenciar multas de trânsito.
      </p>
      <div className="flex flex-col gap-3">
        <p className="font-semibold">Tecnologias:</p>
        <ul className="grid grid-cols-2 gap-3 px-4">
          {tecnologies.map((tecnology) => (
            <li key={tecnology.name} className="flex items-center gap-2 transition-all hover:text-accent">
              <span className="h-2 w-2 rounded-full bg-accent/70" />
              <a href={tecnology.url} target="_blank">
                {tecnology.name}
              </a>
              <ArrowTopRightOnSquareIcon className="h-5 opacity-40" />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Repositório:</p>
        <div className="ml-4 flex items-center gap-2 transition-all hover:text-accent">
          <a href="https://github.com/patrickbvargas/dash-multas" target="_blank">
            github.com/patrickbvargas/dash-multas
          </a>
          <ArrowTopRightOnSquareIcon className="h-5 opacity-40" />
        </div>
      </div>
      <p className="text-xs text-red-600 dark:text-red-400">
        ATENÇÃO: Este site contém dados fictícios para fins de demonstração e não representa informações
        reais.
      </p>
    </div>
  );
};

export default Welcome;
