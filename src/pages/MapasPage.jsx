import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowLeft, IconMapPin } from '@tabler/icons-react';
import DestinosList from '../components/mapas/DestinosList';
import EcuadorMap from '../components/mapas/EcuadorMap';
import { DESTINOS_ECUADOR } from '../data/destinos';

/** Página de mapas: solo Ecuador, con los destinos del planificador. */
export default function MapasPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [tileInfo, setTileInfo] = useState(null);

  return (
    <Container size="xl" py="xl">
      <Button
        component={Link}
        to="/"
        variant="subtle"
        size="sm"
        leftSection={<IconArrowLeft size={16} />}
        mb="md"
        px={0}
      >
        Volver al planificador
      </Button>

      <Group justify="space-between" align="flex-start" mb="lg">
        <div>
          <Title order={2} mb="xs">Mapas de Ecuador</Title>
          <Text c="dimmed">
            Explora los destinos del planificador en un mapa centrado en Ecuador.
            Haz clic en un lugar para verlo o haz clic en el mapa para consultar su tile.
          </Text>
        </div>
        <Badge size="lg" variant="light" color="teal" leftSection={<IconMapPin size={14} />}>
          Solo Ecuador
        </Badge>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap="sm">
            <EcuadorMap
              destinos={DESTINOS_ECUADOR}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onTileClick={setTileInfo}
            />

            {tileInfo && (
              <Paper withBorder p="sm" radius="md">
                <Group justify="space-between" wrap="wrap" gap="xs">
                  <Text size="xs">
                    Último tile consultado:{' '}
                    <b>z{tileInfo.z}/x{tileInfo.x}/y{tileInfo.y}</b> · ID{' '}
                    <b>{tileInfo.tileId}</b>
                  </Text>
                  <Text size="xs" c="dimmed">
                    Centro: {tileInfo.center[0].toFixed(4)}, {tileInfo.center[1].toFixed(4)}
                  </Text>
                </Group>
              </Paper>
            )}
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <DestinosList
            destinos={DESTINOS_ECUADOR}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
