using System;
using System.Collections.Generic;
using System.Text;

namespace PlanningAndExceptionSystem.Repositories.Interfaces
{
    public interface IUnitofWork
    {
        Task CommitAsync();

        void Commit();
    }
}
