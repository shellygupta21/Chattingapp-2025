using System;
using API.Entities;

namespace API.Interfaces;

    public interface IMemberRepository
    {
    void Update(Member member);
    Task<bool> SaveAllSync();
    Task<IReadOnlyList<Member>> GetMembersAsync();
    Task<Member?> GetMemberByIdAsync(string id);
    Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string memberId);

    }
