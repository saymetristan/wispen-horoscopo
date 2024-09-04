export async function generateHoroscope(birthDate: Date): Promise<string> {
  try {
    const response = await fetch('/api/horoscope', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ birthDate }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }

    const data = await response.json();
    return data.horoscope || "Lo siento, no se pudo generar un horóscopo en este momento.";
  } catch (error) {
    console.error('Error al generar el horóscopo:', error);
    return "Hubo un error al consultar las estrellas. Por favor, intenta de nuevo más tarde.";
  }
}
