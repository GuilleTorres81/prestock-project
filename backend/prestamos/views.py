from django.shortcuts import render

# Create your views here.
def lista_prestamos(request):
    # Aquí iría la lógica para obtener la lista de préstamos
    prestamos = []  # Esta lista debería ser reemplazada por la lógica real
    return render(request, 'prestamos/lista_prestamos.html', {'prestamos': prestamos})

def prestamos_datatable(request):
    # Aquí iría la lógica para obtener los datos de los préstamos para el DataTable
    prestamos_data = []  # Esta lista debería ser reemplazada por la lógica real
    return render(request, 'prestamos/prestamos_datatable.html', {'prestamos_data': prestamos_data})

def prestamos_create(request):
    if request.method == 'POST':
        # Aquí iría la lógica para crear un nuevo préstamo
        pass  # Reemplazar con la lógica real
    return render(request, 'prestamos/prestamos_create.html')