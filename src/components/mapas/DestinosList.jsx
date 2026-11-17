import { Badge, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { IconMapPin, IconRoute } from '@tabler/icons-react';
import { getDestinationTile } from '../../lib/pmtiles';

/** Lista de destinos de Ecuador tomada del planificador (misma fuente de datos). */
export default function DestinosList({ destinos, selectedId, onSelect }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group mb="md" gap="xs">
        <IconRoute size={20} color="#228be6" />
        <Title order={4}>Destinos en Ecuador</Title>
      </Group>

      <Stack gap="sm">
        {destinos.map((destino) => {
          const active = selectedId === destino.id;
          const tile = getDestinationTile(destino);

          return (
            <Card
              key={destino.id}
              withBorder
              padding="sm"
              radius="md"
              bg={active ? 'blue.0' : undefined}
            >
              <Group justify="space-between" wrap="nowrap">
                <Group gap="xs" wrap="nowrap">
                  <IconMapPin size={17} color="#228be6" />
                  <Text fw={600} size="sm">{destino.nombre}</Text>
                </Group>
                <Badge size="sm" variant="light" color="teal">
                  {destino.region}
                </Badge>
              </Group>

              <Text size="xs" c="dimmed" mt={6}>
                {destino.descripcion}
              </Text>

              <Group justify="space-between" mt="xs" wrap="nowrap">
                <div>
                  <Text size="xs" fw={600}>${destino.precioBase} USD</Text>
                  <Text size="xs" c="dimmed">{destino.proveedores}</Text>
                </div>
                <Button
                  size="xs"
                  variant={active ? 'light' : 'subtle'}
                  color="blue"
                  onClick={() => onSelect(active ? null : destino.id)}
                >
                  {active ? 'Ocultar' : 'Ver en mapa'}
                </Button>
              </Group>

              <Text size="xs" c="dimmed" mt={6} style={{ fontSize: 11 }}>
                Tile (PMTiles): z{tile.z}/x{tile.x}/y{tile.y} · ID {tile.tileId}
              </Text>
            </Card>
          );
        })}
      </Stack>
    </Card>
  );
}
