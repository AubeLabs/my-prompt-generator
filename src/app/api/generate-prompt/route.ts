import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { role, requirements } = await req.json();

    if (!requirements) {
        return NextResponse.json({ message: 'Requirements are required' }, { status: 400 });
    }

    const prompt = `Role: ${role}\nRequirements: ${requirements}\nGenerate a improved prompt for the provided role and requirements in English.`;

    try {
        const response = await fetch(`${process.env.OPENAI_API_CHAT_ENDPOINT}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                // model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a prompt engineering assistant. Answer the prompt only."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 16384,
            })
        });

        if (!response.ok) {
            console.error(response);

            let errorDetails;
            try {
                const data = await response.json();
                console.error('Error:', data);
                errorDetails = data.error.code + ': ' + data.error.message || data;
            } catch (jsonError) {
                console.error('Failed to parse error response:', jsonError);
                errorDetails = response.statusText;
            }
            throw new Error(`OpenAI API returned an error: ${response.status} ${response.statusText}`, {cause: errorDetails});
        }

        const data = await response.json();
        const generatedPrompt = data.choices[0].message.content.trim();

        return NextResponse.json({ prompt: generatedPrompt });
    } catch (error) {
        if (error instanceof Error) {
            const message = error.message;
            const cause = (error as any).cause;
            return NextResponse.json({ message, cause: cause?.message || cause }, { status: 500 });
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
}