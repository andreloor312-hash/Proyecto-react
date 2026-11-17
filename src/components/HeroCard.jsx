import { Badge, Card, Stack, Text, Title } from '@mantine/core';
import { IconCompass } from '@tabler/icons-react';
import './HeroCard.css';

export default function HeroCard() {
  return (
    <Card
      className="hero-card"
      shadow="lg"
      radius="lg"
      withBorder
      mih={240}
      p="xl"
      mb="xl"
      bg="dark.6"
    >
      <Stack gap="sm">
        <Badge
          className="hero-card__badge"
          color="wine"
          variant="light"
          leftSection={<IconCompass size={14} />}
        >
          Planifica tu viaje
        </Badge>

        <Title className="hero-card__title" order={1} c="gold.3">
          Turismo Exclusivo en Ecuador
        </Title>

        <Title className="hero-card__subtitle" order={3} c="gold.4">
          Planifica tu ruta sin cotizaciones dispersas
        </Title>

        <Text className="hero-card__description" c="dimmed" maw={680}>
          Ingresa tu presupuesto disponible, compara rangos de precios reales y consolida tu viaje en un solo lugar.
        </Text>
      </Stack>
    </Card>
  );
}
