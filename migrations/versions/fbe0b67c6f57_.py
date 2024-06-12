"""empty message

Revision ID: fbe0b67c6f57
Revises: 
Create Date: 2024-06-12 18:34:42.750177

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fbe0b67c6f57'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('user_uuid', sa.String(length=250), nullable=True),
    sa.Column('password', sa.String(length=150), nullable=False),
    sa.Column('rol', sa.Boolean(), nullable=False),
    sa.Column('nombre', sa.String(length=120), nullable=False),
    sa.Column('telefono', sa.String(length=120), nullable=False),
    sa.Column('edad', sa.Integer(), nullable=True),
    sa.Column('genero', sa.String(length=10), nullable=True),
    sa.Column('altura', sa.String(length=30), nullable=True),
    sa.Column('tipo_entrenamiento', sa.String(length=100), nullable=True),
    sa.Column('foto', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('telefono')
    )
    op.create_table('asignacion_entrenador',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('entrenador_id', sa.Integer(), nullable=False),
    sa.Column('usuario_id', sa.Integer(), nullable=False),
    sa.Column('plan_entrenamiento', sa.String(length=50), nullable=False),
    sa.Column('dieta', sa.String(length=100), nullable=True),
    sa.Column('rutina', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['entrenador_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['usuario_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('asignacion_entrenador')
    op.drop_table('user')
    # ### end Alembic commands ###
