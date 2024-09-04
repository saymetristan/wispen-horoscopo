import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { birthDate } = await request.json();
  const formattedDate = new Date(birthDate).toISOString().split('T')[0];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un astrólogo financiero experto y carismático. El alma de la fiesta"
        },
        {
          role: "user",
          content: `Genera un horóscopo financiero divertido y útil basado en esta fecha ${formattedDate}. El horóscopo debe ser positivo, motivador y enfocado en las finanzas personales, con clichés del signo zodiacal y un tono viral.

Estructura la respuesta exactamente de esta manera:

[TÍTULO]: Un título llamativo y divertido relacionado con el signo zodiacal y las finanzas.

[DESCRIPCIÓN]: Una descripción humorística de la relación de la persona con el dinero según su signo zodiacal. Usa metáforas creativas y comparaciones divertidas.

[FORTALEZAS]:
1. **Título de la fortaleza:** Descripción breve y divertida.
2. **Título de la fortaleza:** Descripción breve y divertida.
3. **Título de la fortaleza:** Descripción breve y divertida.

[DEBILIDADES]:
1. **Título de la debilidad:** Descripción breve y divertida.
2. **Título de la debilidad:** Descripción breve y divertida.

[CONSEJOS]:
1. **Título del consejo:** Descripción breve y práctica.
2. **Título del consejo:** Descripción breve y práctica.
3. **Título del consejo:** Descripción breve y práctica.

[NÚMERO DE LA SUERTE]: Un número entre 1 y 100.

[FRASE FINAL]: Una frase motivadora y optimista sobre el futuro financiero.

Presentalo en el siguiente formato, te comparto un ejemplo:
<h4 className="text-xl font-bold text-[#F1C40F]">Cáncer: ¡Tu billetera está lista para salir de su caparazón!</h4>
                <p className="text-lg">Como un verdadero Cáncer, tu relación con el dinero es tan cambiante como las fases de la luna. Un día eres tan tacaño como un cofre del tesoro hundido, y al siguiente gastas como si tus tarjetas de crédito fueran remos en un mar de ofertas.</p>
                <div>
                  <h5 className="text-lg font-semibold mb-2 text-[#2ECC71]">Fortalezas:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ahorrador nato: Guardas dinero como si fuera el último vaso de agua en el desierto.</li>
                    <li>Intuición financiera: Tu sexto sentido para las gangas haría palidecer a cualquier cazador de ofertas.</li>
                    <li>Previsión económica: Planificas tus finanzas con la precisión de un arquitecto diseñando un castillo de arena.</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-lg font-semibold mb-2 text-[#E74C3C]">Debilidades:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Compras emocionales: Tu cartera llora cuando estás triste, celebra cuando estás feliz.</li>
                    <li>Indecisión inversora: Eliges acciones con la misma facilidad que escoges qué película ver en Netflix.</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-lg font-semibold mb-2 text-[#3498DB]">Consejos:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Diversifica tus inversiones: No pongas todos tus cangrejos en la misma pecera.</li>
                    <li>Establece un presupuesto: Dale a tu dinero un mapa para no perderse en el mar de los gastos.</li>
                    <li>Ahorra para emergencias: Construye tu propio salvavidas financiero.</li>
                  </ul>
                </div>
                <p className="text-lg font-bold text-[#F1C40F]">Recuerda, Cáncer, tu futuro financiero brilla más que la luna llena en una noche despejada. ¡Es hora de que tus finanzas salgan de su concha y conquisten el mundo!</p>

Asegúrate de que el tono sea amigable, accesible y humorístico, manteniendo la relevancia para las finanzas personales. Limita la respuesta a aproximadamente 200 palabras.`
        }
      ],
      max_tokens: 1200,
    });

    return NextResponse.json({ horoscope: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error al generar el horóscopo:', error);
    return NextResponse.json({ error: "Hubo un error al consultar las estrellas. Por favor, intenta de nuevo más tarde." }, { status: 500 });
  }
}