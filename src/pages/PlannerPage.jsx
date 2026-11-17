import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  Paper,
  Text,
  TextInput,
  Button,
  Badge,
  Group,
  Overlay,
  Box,
  Stack,
  Title,
  Divider,
  ActionIcon,
  SegmentedControl,
} from '@mantine/core';
import {
  IconLock,
  IconMapPin,
  IconCalculator,
  IconTrash,
  IconCheck,
  IconStar,
  IconSearch,
  IconFilter,
  IconX,
} from '@tabler/icons-react';
import { useAuthStore } from '../store/useAuthStore';
import { useBudgetStore } from '../store/useBudgetStore';
import { DESTINOS_ECUADOR } from '../data/destinos';
import HeroCard from '../components/HeroCard';

export default function PlannerPage() {
  const { user, openAuthModal } = useAuthStore();
  const { items, addItem, removeItem } = useBudgetStore();

  const totalPresupuesto = items.reduce((acc, item) => acc + item.precioBase, 0);

  const [busqueda, setBusqueda] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [region, setRegion] = useState('Todas');

  const destinosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    const precio = Number(precioMax);
    const sinLimiteDePrecio = precioMax.trim() === '' || Number.isNaN(precio);

    return DESTINOS_ECUADOR.filter((destino) => {
      const coincideBusqueda = destino.nombre.toLowerCase().includes(texto);
      const coincidePrecio = sinLimiteDePrecio || destino.precioBase <= precio;
      const coincideRegion = region === 'Todas' || destino.region === region;

      return coincideBusqueda && coincidePrecio && coincideRegion;
    });
  }, [busqueda, precioMax, region]);

  const limpiarFiltros = () => {
    setBusqueda('');
    setPrecioMax('');
    setRegion('Todas');
  };

  return (
    <Container size="xl" py="xl">
      <HeroCard />

      {/* Encabezado con botón directo a Reseñas */}
      <Group justify="space-between" align="flex-start" mb="xl">
        <div>
          <Title order={2} mb="xs">Planificador Integral de Viajes — Ecuador</Title>
          <Text c="dimmed">
            Compara rutas, arma tu presupuesto en tiempo real y reserva con operadores verificados.
          </Text>
        </div>

        <Button
          component={Link}
          to="/resenas"
          variant="light"
          color="teal"
          leftSection={<IconStar size={18} />}
        >
          Ver reseñas de viajeros
        </Button>
      </Group>

      {/* Panel de filtros del catálogo */}
      <Paper withBorder p="md" mb="lg" bg="dark.6">
        <Stack gap="md">
          <Group justify="space-between" gap="sm" wrap="wrap">
            <Group gap="xs" c="gold.3">
              <IconFilter size={18} />
              <Text fw={600}>Filtrar destinos</Text>
            </Group>
            <Button
              variant="subtle"
              color="wine"
              size="xs"
              leftSection={<IconX size={14} />}
              onClick={limpiarFiltros}
            >
              Limpiar filtros
            </Button>
          </Group>

          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Buscar destino"
                placeholder="Buscar destino…"
                leftSection={<IconSearch size={16} />}
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                type="number"
                label="Precio máximo (USD)"
                placeholder="Sin límite"
                min={0}
                value={precioMax}
                onChange={(event) => setPrecioMax(event.target.value)}
              />
            </Grid.Col>
          </Grid>

          <SegmentedControl
            fullWidth
            color="wine"
            aria-label="Filtrar por región"
            data={['Todas', 'Sierra', 'Costa', 'Amazonía']}
            value={region}
            onChange={setRegion}
          />
        </Stack>
      </Paper>

      <Grid>
        {/* Columna Izquierda: Catálogo de Destinos */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack>
            {destinosFiltrados.length === 0 ? (
              <Paper withBorder p="xl" bg="dark.6" ta="center">
                <Stack align="center" gap="xs">
                  <IconSearch size={32} color="var(--mantine-color-gold-3)" />
                  <Text fw={600} c="gold.3">No encontramos destinos con estos filtros</Text>
                  <Text size="sm" c="dimmed">Prueba otra búsqueda, región o un presupuesto más alto.</Text>
                  <Button variant="light" color="wine" size="sm" mt="sm" onClick={limpiarFiltros}>
                    Limpiar filtros
                  </Button>
                </Stack>
              </Paper>
            ) : (
              destinosFiltrados.map((destino) => {
                const yaAgregado = items.some((item) => item.id === destino.id);

                return (
                  <Card key={destino.id} shadow="sm" padding="lg" radius="md" withBorder>
                    <Group justify="space-between" mb="xs">
                      <Group>
                        <IconMapPin size={20} color="#228be6" />
                        <Text fw={600} size="lg">{destino.nombre}</Text>
                      </Group>
                      <Badge color="teal" variant="light">{destino.region}</Badge>
                    </Group>

                    {user ? (
                      <Group justify="space-between" mt="md">
                        <div>
                          <Text size="sm" c="dimmed">Tarifa estimada todo incluido: <b>${destino.precioBase} USD</b></Text>
                          <Text size="xs" c="green">{destino.proveedores}</Text>
                        </div>
                        <Button
                          size="sm"
                          color={yaAgregado ? 'teal' : 'blue'}
                          variant={yaAgregado ? 'light' : 'filled'}
                          leftSection={yaAgregado ? <IconCheck size={16} /> : null}
                          disabled={yaAgregado}
                          onClick={() => addItem(user.uid, destino)}
                        >
                          {yaAgregado ? 'En tu itinerario' : 'Agregar al itinerario'}
                        </Button>
                      </Group>
                    ) : (
                      <Group justify="space-between" mt="md">
                        <Text size="sm" c="dimmed">Inicia sesión para ver tarifas desglosadas y contactos directos</Text>
                        <Button variant="light" size="xs" leftSection={<IconLock size={14} />} onClick={openAuthModal}>
                          Desbloquear precios
                        </Button>
                      </Group>
                    )}
                  </Card>
                );
              })
            )}
          </Stack>
        </Grid.Col>

        {/* Columna Derecha: Presupuesto y Reserva Directa */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Box pos="relative">
            <Card shadow="sm" padding="lg" radius="md" withBorder mih={320}>
              <Group mb="md">
                <IconCalculator size={22} color="#228be6" />
                <Text fw={700}>Mi Presupuesto de Viaje</Text>
              </Group>

              {items.length === 0 ? (
                <Text size="sm" c="dimmed">
                  Aún no has agregado destinos. Selecciona rutas de la lista para calcular tu viaje.
                </Text>
              ) : (
                <Stack gap="sm">
                  {items.map((item) => (
                    <Group key={item.id} justify="space-between" wrap="nowrap">
                      <div>
                        <Text size="sm" fw={500}>{item.nombre}</Text>
                        <Text size="xs" c="dimmed">${item.precioBase} USD</Text>
                      </div>
                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() => removeItem(user.uid, item.id)}
                        title="Eliminar del presupuesto"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  ))}

                  <Divider my="sm" />

                  <Group justify="space-between">
                    <Text fw={700}>Total Estimado:</Text>
                    <Text fw={700} size="lg" c="blue">${totalPresupuesto} USD</Text>
                  </Group>

                  <Button fullWidth color="green" mt="md">
                    Solicitar reserva consolidada
                  </Button>
                </Stack>
              )}
            </Card>

            {/* Capa de restricción si no hay usuario logueado */}
            {!user && (
              <Overlay color="#000" backgroundOpacity={0.65} blur={3} radius="md" center>
                <Stack align="center" p="md" ta="center">
                  <IconLock size={36} color="white" />
                  <Text c="white" fw={600}>Función exclusiva para viajeros registrados</Text>
                  <Text c="gray.3" size="xs">
                    Crea una cuenta gratuita para guardar tu presupuesto y evitar cotizaciones dispersas.
                  </Text>
                  <Button color="blue" onClick={openAuthModal}>
                    Iniciar Sesión / Registrarse
                  </Button>
                </Stack>
              </Overlay>
            )}
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}